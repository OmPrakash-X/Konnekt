# Konnekt - Skill Exchange Platform

A full-stack web application that connects people to exchange skills, book sessions, and build a community of learners and experts. Built for hackathon submission.

**Built by Team Stack Pirates** 🏴‍☠️

## [🚀 Live Demo](https://konnekt-8mwt.onrender.com/)




### 🔑 Demo Credentials

For hackathon judges and reviewers, use these credentials to explore different roles:

#### Admin Access
- **Email**: chillwithleo7@gmail.com
- **Password**: leo@123
- **Access**: Full admin dashboard, user management, skill verification, platform statistics

#### Expert Access
- **Email**: kalvinclarke.http@gmail.com
- **Password**: Shahid@123
- **Access**: Expert dashboard, skill management, session management, profile features

#### Regular User
- Create your own account to experience the full user journey with email verification!

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Usage](#usage)
- [Team](#team)
- [Contributing](#contributing)

## ✨ Features

### User Features
- **Authentication System**: Signup, email verification via OTP, login, password reset
- **Profile Management**: Create and edit profiles with skills, location, and expertise
- **Skill Exchange**: List skills you can teach and find skills you want to learn
- **Session Booking**: Book, confirm, complete, or cancel learning sessions
- **Location-Based Discovery**: Find nearby experts using Mapbox integration
- **Reviews & Ratings**: Rate and review sessions with other users
- **Wallet System**: Credit-based transaction system for sessions
- **Badge System**: Earn badges for achievements and milestones
- **Skill Endorsements**: Endorse other users' skills

### Admin Features
- **User Management**: View, suspend, unsuspend, or delete users
- **Skill Verification**: Approve or reject skill submissions
- **Badge Management**: Create and award badges to users
- **Platform Statistics**: View comprehensive platform analytics
- **Role Management**: Assign admin roles to users

### Advanced Features
- **Map Explorer**: Interactive map showing users by location and skills
- **Search & Filter**: Advanced search by skills, location, and categories
- **Real-time Notifications**: Get notified about session updates
- **Responsive Design**: Fully responsive UI built with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Vite** as build tool
- **Mapbox GL JS** for interactive maps
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Nodemailer** for email services
- **Cloudinary** for image uploads
- **Mapbox API** for geocoding

## 📁 Project Structure

```
konnekt/
├── server/
│   ├── config/           # Database, email, token configs
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Auth, error handling, multer
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   └── index.js          # Server entry point
│
└── client/
    ├── src/
    │   ├── api/          # API service layers
    │   ├── components/   # Reusable React components
    │   ├── hooks/        # Custom React hooks
    │   ├── pages/        # Page components
    │   ├── redux/        # Redux store & slices
    │   ├── routes/       # Route configurations
    │   ├── types/        # TypeScript types
    │   └── utils/        # Utility functions
    └── public/           # Static assets
```

## 🔧 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Mapbox account
- Gmail account (for SMTP)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/OmPrakash-X/Konnekt.git
cd konnekt
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables** (see below)

5. **Start MongoDB** (if using local)
```bash
mongod
```

6. **Run the application**

Terminal 1 - Start server:
```bash
cd server
npm start
```

Terminal 2 - Start client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 🔐 Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Frontend URL
FRONTEND_URL=http://localhost:5173

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASS=your_app_password

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_secret

# Mapbox Configuration
MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Konnekt
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

### Setup Instructions:

1. **MongoDB**: Create a database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use local MongoDB
2. **Gmail SMTP**: Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) and get your credentials
4. **Mapbox**: Create account at [mapbox.com](https://www.mapbox.com) and get access token

## 📡 API Routes

### Authentication Routes (`/api/v1/auth`)
- `POST /signup` - Create new account
- `POST /verify-email` - Verify email with OTP
- `POST /resend-verification` - Resend verification OTP
- `POST /signin` - Login user
- `POST /signout` - Logout user
- `POST /password/forgot` - Send password reset OTP
- `POST /password/verify-otp` - Verify reset OTP
- `POST /password/reset` - Reset password

### User Routes (`/api/v1/user`)
- `GET /me` - Get current user profile (auth)
- `GET /:id` - Get user by ID (public)
- `PUT /update` - Update profile (auth)
- `DELETE /delete` - Delete account (auth)
- `PUT /notifications` - Update notification preferences (auth)
- `GET /search/users` - Search users (public)
- `GET /experts/all` - Get all experts (public)
- `PUT /location/address` - Update location by address (auth)
- `PUT /location/coordinates` - Update location by coordinates (auth)
- `GET /nearby` - Get nearby users (public)
- `GET /nearby/mock` - Get mock nearby users (public)
- `GET /by-city` - Get users by city (public)
- `GET /search/location-skills` - Search by location and skills (public)
- `GET /experts/nearby` - Get nearby experts (public)

### Skill Routes (`/api/v1/skill`)
- `GET /all` - Get all skills (public)
- `GET /:id` - Get skill by ID (public)
- `GET /category/:category` - Get skills by category (public)
- `POST /create` - Create new skill (auth)
- `GET /my/skills` - Get user's skills (auth)
- `PUT /:id` - Update skill (auth)
- `DELETE /:id` - Delete skill (auth)
- `POST /:id/endorse` - Endorse a skill (auth)

### Session Routes (`/api/v1/session`)
- `POST /create` - Create session (auth)
- `GET /my-sessions` - Get user's sessions (auth)
- `GET /:id` - Get session details (auth)
- `PUT /:id/update` - Update session (auth)
- `PUT /:id/confirm` - Confirm session (auth)
- `PUT /:id/complete` - Complete session (auth)
- `PUT /:id/cancel` - Cancel session (auth)

### Review Routes (`/api/v1/review`)
- `GET /user/:userId` - Get user reviews (public)
- `POST /create` - Create review (auth)
- `GET /my-reviews` - Get user's reviews (auth)
- `PUT /:id` - Update review (auth)
- `DELETE /:id` - Delete review (auth)

### Badge Routes (`/api/v1/badge`)
- `GET /all` - Get all badges (public)
- `GET /:id` - Get badge by ID (public)
- `GET /category/:category` - Get badges by category (public)
- `POST /create` - Create badge (admin)
- `PUT /:id` - Update badge (admin)
- `DELETE /:id` - Delete badge (admin)

### Transaction Routes (`/api/v1/transaction`)
- `GET /my-transactions` - Get user transactions (auth)
- `GET /:id` - Get transaction by ID (auth)
- `GET /admin/all` - Get all transactions (admin)
- `POST /admin/add-credits` - Add credits to user (admin)

### Admin Routes (`/api/v1/admin`)
- `GET /users` - Get all users (admin)
- `PUT /user/:id/role` - Update user role (admin)
- `PUT /user/:id/suspend` - Suspend user (admin)
- `PUT /user/:id/unsuspend` - Unsuspend user (admin)
- `DELETE /user/:id` - Delete user (admin)
- `GET /skills/pending` - Get pending skills (admin)
- `PUT /skill/:skillId/verify` - Verify skill (admin)
- `POST /badge/award` - Award badge (admin)
- `GET /stats` - Get platform statistics (admin)

## 🎯 Usage

### For Users

1. **Sign Up**: Create an account with email verification
2. **Complete Profile**: Add your skills, location, and bio
3. **Browse Skills**: Explore skills offered by other users
4. **Book Sessions**: Schedule learning sessions with experts
5. **Earn Credits**: Complete sessions to earn credits
6. **Get Badges**: Achieve milestones to unlock badges
7. **Leave Reviews**: Rate your learning experiences

### For Experts

1. **Add Skills**: List skills you can teach
2. **Set Availability**: Manage your teaching schedule
3. **Accept Bookings**: Confirm session requests
4. **Conduct Sessions**: Share your knowledge
5. **Build Reputation**: Earn reviews and endorsements

### For Admins

1. **Access Admin Dashboard**: Login with admin credentials
2. **Manage Users**: Monitor and moderate user accounts
3. **Verify Skills**: Approve skill submissions
4. **Award Badges**: Recognize user achievements
5. **Monitor Platform**: View analytics and statistics

## 👥 Team

**Team Stack Pirates** 🏴‍☠️

This project was built with passion and dedication by Team Stack Pirates for the hackathon.

## 🤝 Contributing

This is a hackathon project. For contributions or suggestions, please reach out to the development team.

## 📄 License

This project is created for hackathon purposes.

---

**Forged with ❤️ and a Hacker’s Spirit
by Team Stack Pirates — IIT BBSR ⚔️ TechZephyr 3.0 🏴‍☠️**