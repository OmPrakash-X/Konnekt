import User from "../models/userModel.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "../utils/geoCoding.js";


// ===== GET USER PROFILE =====
export const getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("skills")
    .populate("learningNeeds")
    .populate("badges");

  res.status(200).json({
    success: true,
    user,
  });
});

// ===== GET USER BY ID (PUBLIC) =====
export const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select("-passwordHash -resetOtp -otpExpires -isOtpVerified")
    .populate("skills")
    .populate("learningNeeds")
    .populate("badges");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Increment profile views
  user.profileViews += 1;
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    user,
  });
});

// ===== UPDATE PROFILE =====
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    bio,
    phone,
    avatar,
    location,
    availability,
    preferences,
    socialLinks,
    accessibility,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;
  if (location) user.location = { ...user.location, ...location };
  if (availability) user.availability = { ...user.availability, ...availability };
  if (preferences) user.preferences = { ...user.preferences, ...preferences };
  if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
  if (accessibility) user.accessibility = { ...user.accessibility, ...accessibility };

  // Calculate profile completeness
  const completeness = calculateProfileCompleteness(user);
  user.profileCompleteness = completeness;
  user.isProfileComplete = completeness >= 80;

  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// ===== UPDATE NOTIFICATION PREFERENCES =====
export const updateNotifications = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.notifications = { ...user.notifications, ...req.body };
  await user.save({ validateModifiedOnly: true });

  res.status(200).json({
    success: true,
    message: "Notification preferences updated",
    notifications: user.notifications,
  });
});

// ===== SEARCH USERS =====
export const searchUsers = catchAsyncErrors(async (req, res, next) => {
  const { query, city, category, role, page = 1, limit = 20 } = req.query;

  const searchCriteria = {
    isVerified: true,
    accountStatus: "active",
  };

  if (query) {
    searchCriteria.$text = { $search: query };
  }

  if (city) {
    searchCriteria["location.city"] = new RegExp(city, "i");
  }

  if (role) {
    searchCriteria.role = role;
  }

  const users = await User.find(searchCriteria)
    .select("-passwordHash -resetOtp -otpExpires")
    .populate("skills")
    .populate("badges")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ averageRating: -1, completedSessions: -1 });

  const total = await User.countDocuments(searchCriteria);

  res.status(200).json({
    success: true,
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

// ===== GET ALL EXPERTS =====
export const getAllExperts = catchAsyncErrors(async (req, res, next) => {
  const experts = await User.find({
    role: "expert",
    "expertProfile.isExpert": true,
    accountStatus: "active",
  })
    .select("-passwordHash -resetOtp -otpExpires")
    .populate("skills")
    .populate("badges")
    .sort({ averageRating: -1 });

  res.status(200).json({
    success: true,
    count: experts.length,
    experts,
  });
});

// ===== DELETE ACCOUNT (SELF) =====
export const deleteMyAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.accountStatus = "deactivated";
  await user.save({ validateModifiedOnly: true });

  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });
});

// ===== MAPBOX LOCATION METHODS =====

// ===== UPDATE USER LOCATION WITH ADDRESS =====
export const updateUserLocation = catchAsyncErrors(async (req, res, next) => {
  const { address, city, area, state } = req.body;

  if (!address) {
    return next(new ErrorHandler("Address is required", 400));
  }

  try {
    // Get coordinates from Mapbox Geocoding API
    const locationData = await getCoordinatesFromAddress(address);

    const user = await User.findById(req.user._id);

    // Update location with GeoJSON Point format
    user.location = {
      type: 'Point',
      coordinates: [locationData.longitude, locationData.latitude],
      address: locationData.placeName || address,
      city: city || locationData.context?.find(c => c.id.includes('place'))?.text || '',
      area: area || '',
      state: state || locationData.context?.find(c => c.id.includes('region'))?.text || '',
      country: 'India',
      lastUpdated: new Date()
    };

    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      location: user.location
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to update location", 500));
  }
});

// ===== UPDATE USER LOCATION WITH GPS COORDINATES =====
export const updateUserLocationByCoordinates = catchAsyncErrors(async (req, res, next) => {
  const { longitude, latitude } = req.body;

  if (!longitude || !latitude) {
    return next(new ErrorHandler("Longitude and latitude are required", 400));
  }

  // Validate coordinate ranges
  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    return next(new ErrorHandler("Invalid coordinates", 400));
  }

  try {
    // Get address from Mapbox Reverse Geocoding API
    const addressData = await getAddressFromCoordinates(longitude, latitude);

    const user = await User.findById(req.user._id);

    // Update location with GeoJSON Point format
    user.location = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
      address: addressData.placeName || '',
      city: user.location?.city || '',
      area: user.location?.area || '',
      state: user.location?.state || '',
      country: 'India',
      lastUpdated: new Date()
    };

    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      location: user.location
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to update location", 500));
  }
});

// ===== GET NEARBY USERS WITHIN RADIUS =====
export const getNearbyUsers = catchAsyncErrors(async (req, res, next) => {
  const {
    longitude,
    latitude,
    radius = 5000,
    skillId,
    limit = 50,
    sessionMode,
    minRating
  } = req.query;

  if (!longitude || !latitude) {
    return next(new ErrorHandler("Longitude and latitude are required", 400));
  }

  // Build query conditions
  const queryConditions = {
    accountStatus: "active",
    isVerified: true,
    'location.coordinates': { $exists: true }
  };

  // Exclude current user if authenticated
  if (req.user) {
    queryConditions._id = { $ne: req.user._id };
  }

  // Add skill filter
  if (skillId) {
    queryConditions.skills = skillId;
  }

  // Add session mode filter
  if (sessionMode) {
    queryConditions['preferences.sessionMode'] = sessionMode;
  }

  // Add rating filter
  if (minRating) {
    queryConditions.averageRating = { $gte: parseFloat(minRating) };
  }

  // Use aggregation pipeline for geospatial query with distance calculation
  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        distanceField: 'distance',
        maxDistance: parseInt(radius),
        spherical: true,
        query: queryConditions,
        key: 'location'
      }
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'skills',
        foreignField: '_id',
        as: 'skills'
      }
    },
    {
      $lookup: {
        from: 'badges',
        localField: 'badges',
        foreignField: '_id',
        as: 'badges'
      }
    },
    {
      $project: {
        passwordHash: 0,
        resetOtp: 0,
        otpExpires: 0,
        isOtpVerified: 0
      }
    },
    {
      $sort: { distance: 1, averageRating: -1 }
    },
    {
      $limit: parseInt(limit)
    }
  ];

  const users = await User.aggregate(pipeline);

  // Convert distance to kilometers for response
  const usersWithKmDistance = users.map(user => ({
    ...user,
    distanceInKm: (user.distance / 1000).toFixed(2),
    distanceInMeters: Math.round(user.distance)
  }));

  res.status(200).json({
    success: true,
    count: users.length,
    radius: parseInt(radius),
    radiusInKm: (parseInt(radius) / 1000).toFixed(2),
    center: {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude)
    },
    users: usersWithKmDistance
  });
});

// ===== GET USERS BY CITY =====
export const getUsersByCity = catchAsyncErrors(async (req, res, next) => {
  const { city, skillId, page = 1, limit = 20, sortBy = 'rating' } = req.query;

  if (!city) {
    return next(new ErrorHandler("City is required", 400));
  }

  const query = {
    'location.city': new RegExp(city, 'i'),
    accountStatus: "active",
    isVerified: true
  };

  if (skillId) {
    query.skills = skillId;
  }

  // Exclude current user
  if (req.user) {
    query._id = { $ne: req.user._id };
  }

  // Determine sort order
  let sortOrder = { averageRating: -1, completedSessions: -1 };
  if (sortBy === 'sessions') {
    sortOrder = { completedSessions: -1, averageRating: -1 };
  } else if (sortBy === 'recent') {
    sortOrder = { lastActive: -1 };
  }

  const users = await User.find(query)
    .select('-passwordHash -resetOtp -otpExpires -isOtpVerified')
    .populate('skills')
    .populate('badges')
    .sort(sortOrder)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: users.length,
    city,
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    total
  });
});

// ===== ADVANCED SEARCH: BY LOCATION + SKILLS + FILTERS =====
export const searchUsersByLocationAndSkills = catchAsyncErrors(async (req, res, next) => {
  const {
    longitude,
    latitude,
    radius = 10000,
    skills,
    sessionMode,
    minRating,
    maxHourlyRate,
    sortBy = 'distance',
    limit = 50
  } = req.query;

  if (!longitude || !latitude) {
    return next(new ErrorHandler("Longitude and latitude are required", 400));
  }

  // Build query conditions
  const queryConditions = {
    accountStatus: "active",
    isVerified: true,
    'location.coordinates': { $exists: true }
  };

  // Exclude current user
  if (req.user) {
    queryConditions._id = { $ne: req.user._id };
  }

  // Add filters
  if (sessionMode) {
    queryConditions['preferences.sessionMode'] = sessionMode;
  }

  if (minRating) {
    queryConditions.averageRating = { $gte: parseFloat(minRating) };
  }

  if (maxHourlyRate) {
    queryConditions['expertProfile.hourlyRate'] = { $lte: parseFloat(maxHourlyRate) };
  }

  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        distanceField: 'distance',
        maxDistance: parseInt(radius),
        spherical: true,
        query: queryConditions,
        key: 'location'
      }
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'skills',
        foreignField: '_id',
        as: 'skillsData'
      }
    }
  ];

  // Add skill name filtering if provided
  if (skills) {
    const skillsArray = skills.split(',').map(s => s.trim());
    pipeline.push({
      $match: {
        'skillsData.name': {
          $in: skillsArray.map(s => new RegExp(s, 'i'))
        }
      }
    });
  }

  // Add badges lookup
  pipeline.push({
    $lookup: {
      from: 'badges',
      localField: 'badges',
      foreignField: '_id',
      as: 'badgesData'
    }
  });

  // Remove sensitive fields
  pipeline.push({
    $project: {
      passwordHash: 0,
      resetOtp: 0,
      otpExpires: 0,
      isOtpVerified: 0
    }
  });

  // Apply sorting
  if (sortBy === 'rating') {
    pipeline.push({ $sort: { averageRating: -1, distance: 1 } });
  } else if (sortBy === 'sessions') {
    pipeline.push({ $sort: { completedSessions: -1, distance: 1 } });
  } else {
    pipeline.push({ $sort: { distance: 1, averageRating: -1 } });
  }

  // Limit results
  pipeline.push({ $limit: parseInt(limit) });

  const users = await User.aggregate(pipeline);

  // Format response with distance in km
  const formattedUsers = users.map(user => ({
    ...user,
    skills: user.skillsData,
    badges: user.badgesData,
    distanceInKm: (user.distance / 1000).toFixed(2),
    distanceInMeters: Math.round(user.distance)
  }));

  res.status(200).json({
    success: true,
    count: formattedUsers.length,
    searchParams: {
      radius: parseInt(radius),
      radiusInKm: (parseInt(radius) / 1000).toFixed(2),
      skills: skills?.split(',') || [],
      sessionMode,
      minRating,
      sortBy
    },
    users: formattedUsers
  });
});

// ===== GET NEARBY EXPERTS (VERIFIED ONLY) =====
export const getNearbyExperts = catchAsyncErrors(async (req, res, next) => {
  const {
    longitude,
    latitude,
    radius = 10000,
    expertiseArea,
    maxHourlyRate,
    limit = 30
  } = req.query;

  if (!longitude || !latitude) {
    return next(new ErrorHandler("Longitude and latitude are required", 400));
  }

  const queryConditions = {
    accountStatus: "active",
    isVerified: true,
    role: "expert",
    'expertProfile.isExpert': true,
    'location.coordinates': { $exists: true }
  };

  if (req.user) {
    queryConditions._id = { $ne: req.user._id };
  }

  if (expertiseArea) {
    queryConditions['expertProfile.expertiseAreas'] = new RegExp(expertiseArea, 'i');
  }

  if (maxHourlyRate) {
    queryConditions['expertProfile.hourlyRate'] = { $lte: parseFloat(maxHourlyRate) };
  }

  const pipeline = [
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        distanceField: 'distance',
        maxDistance: parseInt(radius),
        spherical: true,
        query: queryConditions,
        key: 'location'
      }
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'skills',
        foreignField: '_id',
        as: 'skills'
      }
    },
    {
      $lookup: {
        from: 'badges',
        localField: 'badges',
        foreignField: '_id',
        as: 'badges'
      }
    },
    {
      $project: {
        passwordHash: 0,
        resetOtp: 0,
        otpExpires: 0
      }
    },
    {
      $sort: { distance: 1, averageRating: -1, 'expertProfile.yearsOfExperience': -1 }
    },
    {
      $limit: parseInt(limit)
    }
  ];

  const experts = await User.aggregate(pipeline);

  const formattedExperts = experts.map(expert => ({
    ...expert,
    distanceInKm: (expert.distance / 1000).toFixed(2),
    distanceInMeters: Math.round(expert.distance)
  }));

  res.status(200).json({
    success: true,
    count: formattedExperts.length,
    radius: parseInt(radius),
    radiusInKm: (parseInt(radius) / 1000).toFixed(2),
    experts: formattedExperts
  });
});

// ===== HELPER: Calculate Profile Completeness =====
function calculateProfileCompleteness(user) {
  let score = 0;
  const fields = [
    user.name,
    user.email,
    user.bio,
    user.avatar,
    user.phone,
    user.location?.city,
    user.skills?.length > 0,
    user.availability?.days?.length > 0,
  ];

  fields.forEach((field) => {
    if (field) score += 12.5;
  });

  return Math.round(score);
}

// ===== GENERATE MOCK NEARBY USERS FOR DEMO =====


// Helper: Generate random coordinates within radius
function generateRandomPoint(centerLng, centerLat, radiusMeters) {
  const radiusDegrees = radiusMeters / 111300; // Convert meters to degrees
  
  const u = Math.random();
  const v = Math.random();
  
  const w = radiusDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  const xp = x / Math.cos(centerLat * Math.PI / 180);
  
  return {
    longitude: centerLng + xp,
    latitude: centerLat + y
  };
}

// Helper: Generate mock users with different skills
function generateMockUsers(centerLng, centerLat, radius, count, filterSkill) {
  const skillCategories = {
    'JavaScript': { color: '#F7DF1E', names: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh'] },
    'Python': { color: '#3776AB', names: ['Anjali Gupta', 'Rohan Das', 'Kavya Iyer', 'Arjun Mehta', 'Neha Joshi'] },
    'React': { color: '#61DAFB', names: ['Aditya Nair', 'Pooja Verma', 'Karthik Rao', 'Divya Pillai', 'Sanjay Kumar'] },
    'Node.js': { color: '#339933', names: ['Ravi Shankar', 'Meera Desai', 'Suresh Babu', 'Lakshmi Menon', 'Prakash Reddy'] },
    'Photography': { color: '#FF6B6B', names: ['Aryan Patel', 'Ishita Sharma', 'Dev Malhotra', 'Tanya Kapoor', 'Nikhil Rao'] },
    'Guitar': { color: '#FF8C42', names: ['Varun Khanna', 'Ananya Singh', 'Kunal Jain', 'Ritu Bansal', 'Harsh Agarwal'] },
    'Yoga': { color: '#9B59B6', names: ['Swati Kulkarni', 'Rajesh Iyer', 'Parvati Nair', 'Gopal Krishna', 'Sunita Devi'] },
    'Cooking': { color: '#E74C3C', names: ['Ramesh Pillai', 'Geeta Rani', 'Arun Kumar', 'Sarita Devi', 'Mahesh Babu'] },
    'Web Design': { color: '#16A085', names: ['Vishal Gupta', 'Shreya Joshi', 'Manish Tiwari', 'Aarti Mishra', 'Deepak Yadav'] },
    'Data Science': { color: '#2ECC71', names: ['Naveen Reddy', 'Preeti Agarwal', 'Siddharth Bose', 'Madhuri Deshmukh', 'Vivek Chopra'] }
  };

  const allSkills = Object.keys(skillCategories);
  const targetSkill = filterSkill || allSkills[Math.floor(Math.random() * allSkills.length)];
  
  const mockUsers = [];
  
  for (let i = 0; i < count; i++) {
    const point = generateRandomPoint(centerLng, centerLat, radius);
    const distance = calculateDistance(centerLat, centerLng, point.latitude, point.longitude);
    
    // Select skill based on filter or random with weighted distribution
    let userSkill;
    if (filterSkill) {
      userSkill = filterSkill;
    } else {
      // 60% chance of target skill, 40% other skills
      userSkill = Math.random() < 0.6 
        ? targetSkill 
        : allSkills[Math.floor(Math.random() * allSkills.length)];
    }
    
    const skillData = skillCategories[userSkill] || skillCategories['JavaScript'];
    const names = skillData.names;
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    // Generate additional skills
    const secondarySkills = allSkills
      .filter(s => s !== userSkill)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    mockUsers.push({
      _id: `mock_${i}_${Date.now()}`,
      name: `${randomName} ${i + 1}`,
      email: `${randomName.toLowerCase().replace(' ', '.')}${i}@example.com`,
      skills: [
        { name: userSkill, level: ['Beginner', 'Intermediate', 'Advanced', 'Expert'][Math.floor(Math.random() * 4)] },
        ...secondarySkills.map(skill => ({
          name: skill,
          level: ['Beginner', 'Intermediate'][Math.floor(Math.random() * 2)]
        }))
      ],
      location: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude],
        address: `Near Jaydev Vihar, Bhubaneswar`,
        city: 'Bhubaneswar',
        state: 'Odisha'
      },
      distance: distance,
      distanceInKm: (distance / 1000).toFixed(2),
      distanceInMeters: Math.round(distance),
      averageRating: (3.5 + Math.random() * 1.5).toFixed(1),
      totalReviews: Math.floor(Math.random() * 50) + 5,
      completedSessions: Math.floor(Math.random() * 30) + 1,
      bio: `Passionate about ${userSkill}. Available for skill exchange and learning.`,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomName}`,
      primarySkillColor: skillData.color,
      isOnline: Math.random() > 0.5
    });
  }
  
  // Sort by distance
  return mockUsers.sort((a, b) => a.distance - b.distance);
}

// Helper: Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

// ===== GENERATE MOCK NEARBY USERS FOR DEMO =====
export const getMockNearbyUsers = catchAsyncErrors(async (req, res, next) => {
  try {
    const { longitude, latitude, radius = 5000, skillName, limit = 50 } = req.query;

    console.log('🎯 Mock API Called!');
    console.log('📍 Coordinates:', { longitude, latitude, radius });

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: 'Longitude and latitude are required'
      });
    }

    const centerLng = parseFloat(longitude);
    const centerLat = parseFloat(latitude);
    const radiusMeters = parseInt(radius);

    // Generate mock users
    const mockUsers = [];
    const numUsers = 15; // Fixed number for testing

    const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'Photography', 'Guitar', 'Yoga', 'Cooking'];
    const colors = ['#F7DF1E', '#3776AB', '#61DAFB', '#339933', '#FF6B6B', '#FF8C42', '#9B59B6', '#E74C3C'];
    const names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rohan', 'Kavya', 'Arjun', 'Neha'];

    for (let i = 0; i < numUsers; i++) {
      // Generate random point within radius
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radiusMeters;
      const dx = distance * Math.cos(angle) / 111300; // Convert to degrees
      const dy = distance * Math.sin(angle) / 111300;

      const lng = centerLng + dx;
      const lat = centerLat + dy;

      const skillIndex = i % skills.length;
      const skill = skills[skillIndex];
      const color = colors[skillIndex];
      const name = names[i % names.length];

      mockUsers.push({
        _id: `mock_${i}`,
        name: `${name} ${i + 1}`,
        email: `${name.toLowerCase()}${i}@example.com`,
        skills: [
          { name: skill, level: 'Intermediate' },
          { name: skills[(skillIndex + 1) % skills.length], level: 'Beginner' }
        ],
        location: {
          type: 'Point',
          coordinates: [lng, lat],
          address: 'Near Jaydev Vihar, Bhubaneswar',
          city: 'Bhubaneswar',
          state: 'Odisha'
        },
        distance: distance,
        distanceInKm: (distance / 1000).toFixed(2),
        distanceInMeters: Math.round(distance),
        averageRating: (3.5 + Math.random() * 1.5).toFixed(1),
        totalReviews: Math.floor(Math.random() * 50) + 5,
        completedSessions: Math.floor(Math.random() * 30) + 1,
        bio: `Passionate about ${skill}. Available for skill exchange.`,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        primarySkillColor: color,
        isOnline: Math.random() > 0.5
      });
    }

    console.log(`✅ Generated ${mockUsers.length} mock users`);

    res.status(200).json({
      success: true,
      count: mockUsers.length,
      radius: radiusMeters,
      radiusInKm: (radiusMeters / 1000).toFixed(2),
      center: { longitude: centerLng, latitude: centerLat },
      users: mockUsers,
      isMockData: true
    });

  } catch (error) {
    console.error('❌ Mock API Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
});
