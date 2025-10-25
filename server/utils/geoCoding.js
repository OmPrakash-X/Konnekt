
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';

const geocodingClient = mbxGeocoding({ 
  accessToken: process.env.MAPBOX_ACCESS_TOKEN 
});

// Convert address to coordinates (Forward Geocoding)
export const getCoordinatesFromAddress = async (address) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
        countries: ['IN'] // Restrict to India for your use case
      })
      .send();
    
    if (response && response.body && response.body.features && response.body.features.length > 0) {
      const feature = response.body.features[0];
      return {
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        placeName: feature.place_name,
        context: feature.context
      };
    }
    throw new Error('No coordinates found for this address');
  } catch (error) {
    console.error('Geocoding Error:', error);
    throw new Error(`Failed to geocode address: ${error.message}`);
  }
};

// Convert coordinates to address (Reverse Geocoding)
export const getAddressFromCoordinates = async (longitude, latitude) => {
  try {
    const response = await geocodingClient
      .reverseGeocode({
        query: [longitude, latitude],
        limit: 1
      })
      .send();
    
    if (response && response.body && response.body.features && response.body.features.length > 0) {
      return {
        placeName: response.body.features[0].place_name,
        coordinates: [longitude, latitude]
      };
    }
    throw new Error('No address found for these coordinates');
  } catch (error) {
    console.error('Reverse Geocoding Error:', error);
    throw new Error(`Failed to reverse geocode: ${error.message}`);
  }
};

// Get nearby places within radius
export const getNearbyPlaces = async (longitude, latitude, radius = 5000, types = ['place']) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: `${latitude},${longitude}`,
        proximity: [longitude, latitude],
        limit: 10,
        types: types
      })
      .send();
    
    return response.body.features || [];
  } catch (error) {
    console.error('Nearby Places Error:', error);
    throw new Error(`Failed to fetch nearby places: ${error.message}`);
  }
};
