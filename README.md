Telemedicine Platform

A full-stack telemedicine application that connects patients with doctors for online consultations, prescription management, and health tracking. Built with modern tech stack including React, Node.js, MongoDB, and Twilio for video calls.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## ✨ Features

### For Patients
- **User Registration & Login** - Create account and manage profile
- **Doctor Discovery** - Browse and search available doctors by specialty
- **Book Appointments** - Schedule video consultations with doctors
- **Video Consultations** - Real-time video calls powered by Twilio
- **Prescription Management** - View and download prescriptions as PDF
- **Medical Records** - Access appointment history and health information
- **SOS Feature** - Emergency alert system for urgent situations
- **Follow-up Tracking** - Schedule and track follow-up appointments
- **Feedback & Ratings** - Rate doctors and leave feedback
- **AI Chatbot** - Get initial health assessment through chatbot
- **Multi-language Support** - Interface available in multiple languages
- **Symptom Mapper** - Map symptoms to potential conditions

### For Doctors
- **Dashboard** - View upcoming appointments and patient requests
- **Appointment Management** - Accept/reject/reschedule consultations
- **Patient Management** - View patient history and medical records
- **Prescription Generation** - Create and send digital prescriptions
- **Follow-up Management** - Schedule follow-up appointments
- **Video Consultations** - Conduct secure video consultations

### For Admins
- **Admin Dashboard** - Manage doctors, patients, and appointments
- **User Verification** - Verify doctor credentials
- **System Analytics** - Track usage and system health
- **Content Management** - Manage medications, workouts, diets

## 💻 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/UI** - Component library
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations
- **Twilio Video SDK** - Video calling
- **i18next** - Internationalization

### Backend
- **Node.js + Express** - Server runtime and framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File uploads
- **Socket.io** - Real-time communication
- **Twilio SDK** - SMS and video services
- **PDFKit** - PDF generation
- **Express Validator** - Input validation

### AI/ML
- **Python** - Data processing
- **Disease prediction model** - Symptom mapping and diagnosis suggestions
- **Diet and workout recommendations** - Personalized health plans

## 📦 Prerequisites

Before you begin, make sure you have installed:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **npm** or **yarn** (comes with Node.js)
3. **MongoDB** - Either local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud database
4. **Git** - For cloning the repository

### Optional for Full Features
- **Twilio Account** - For video calls and SMS (sign up at [twilio.com](https://www.twilio.com))
- **Python 3.8+** - For running the AI model

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ESWASTHYA
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Create Environment File
Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following variables to `.env`:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/thakur-hack
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/thakur-hack

# Server Port
PORT=5001

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Twilio Configuration (for video calls and SMS)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_API_KEY=your_api_key
TWILIO_API_SECRET=your_api_secret

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Create Environment File
Create a `.env` file in the `frontend` directory:

```bash
cd frontend
touch .env
```

Add the following:

```env
VITE_API_URL=http://localhost:5001
VITE_TWILIO_ACCOUNT_SID=your_account_sid
VITE_TWILIO_AUTH_TOKEN=your_auth_token
```

## ▶️ Running the Application

### Option 1: Run Both Frontend and Backend Simultaneously

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5001`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Option 2: Run Backend Only (Production)
```bash
cd backend
npm start
```

### Option 3: Run Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
thakur-hack/
├── backend/
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   ├── models/             # Database schemas
│   ├── routes/             # API endpoints
│   ├── middlewares/        # Custom middleware
│   ├── services/           # Utility services
│   ├── utils/              # Helper functions
│   ├── uploads/            # File storage
│   ├── server.js           # Express app entry
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── i8n/            # Translation files
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── vite.config.ts
│   └── package.json
│
└── model/
    ├── ai.py               # ML model
    ├── description.csv     # Disease descriptions
    ├── medications.csv
    ├── diets.csv
    └── workout_df.csv
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Patients
- `GET /api/patient/profile` - Get patient profile
- `PUT /api/patient/profile` - Update patient profile
- `GET /api/patient/appointments` - Get patient appointments

### Doctors
- `GET /api/doctor/list` - Get all doctors
- `GET /api/doctor/:id` - Get doctor details
- `PUT /api/doctor/profile` - Update doctor profile
- `GET /api/doctor/appointments` - Get doctor appointments

### Appointments
- `POST /api/appointment/book` - Book appointment
- `GET /api/appointment/:id` - Get appointment details
- `PUT /api/appointment/:id` - Update appointment
- `DELETE /api/appointment/:id` - Cancel appointment

### Prescriptions
- `POST /api/prescription/create` - Create prescription
- `GET /api/prescription/:id` - Get prescription
- `GET /api/prescription/download/:id` - Download as PDF

### Video Calls
- `POST /api/video/token` - Generate video token
- `GET /api/video/room/:roomId` - Get room details

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Manage users
- `GET /api/admin/doctors` - Manage doctors

### Other Features
- `POST /api/feedback` - Submit feedback
- `POST /api/followup` - Schedule follow-up
- `POST /api/sos/alert` - Send SOS alert
- `POST /api/chatbot/query` - Chatbot interaction

## 🔐 Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/thakur-hack` |
| `PORT` | Server port | `5001` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `TWILIO_ACCOUNT_SID` | Twilio account ID | From Twilio dashboard |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | From Twilio dashboard |
| `TWILIO_API_KEY` | Twilio API key | From Twilio dashboard |
| `TWILIO_API_SECRET` | Twilio API secret | From Twilio dashboard |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001` |
| `VITE_TWILIO_ACCOUNT_SID` | Twilio account ID | From Twilio dashboard |

## 🧪 Testing

### Run Frontend Tests
```bash
cd frontend
npm run test
npm run test:watch   # Watch mode
```

### Test Mock OTP (Backend)
```bash
cd backend
node test_mock_otp.js
```

### Test Twilio Integration
```bash
cd backend
node test_twilio.js
```

### Test Video API
```bash
cd backend
node test-video-api.js
```

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Make sure backend is running on port 5001
- Check `VITE_API_URL` in `.env` file
- Verify CORS settings in backend

### MongoDB connection error
- Ensure MongoDB is running locally or Atlas is accessible
- Check `MONGO_URI` in `.env`
- Verify database credentials

### Video calls not working
- Confirm Twilio credentials in `.env`
- Check Twilio account balance
- Verify video token generation

### Port already in use
```bash
# Kill process on port 5001 (backend)
npx kill-port 5001

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

## 📝 Additional Guides

- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup instructions
- See [VIDEO_TESTING_GUIDE.md](./VIDEO_TESTING_GUIDE.md) for video call testing
- See [TEST_DATA_SETUP.md](./TEST_DATA_SETUP.md) for test data configuration

## 🤝 Contributing

This project was built during a hackathon. Feel free to fork, improve, and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 💡 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] AI-powered diagnosis system
- [ ] Blockchain-based medical records
- [ ] Insurance integration
- [ ] Prescription refill automation
- [ ] Telemedicine group consultations

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Happy coding!** 🚀
