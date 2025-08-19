# Hotel Booking and Management System

A full-stack hotel booking and management platform built with React.js and Spring Boot. This application allows users to browse and book hotel rooms, while administrators can manage rooms, bookings, and user accounts.

## 🎯 Current Status

- ✅ **Frontend**: Ready to run (React.js with Create React App)
- ⚠️ **Backend**: Requires Java 21, Maven, and MySQL installation
- 📝 **Documentation**: Complete setup instructions provided below

## 🚀 Features

### User Features

- **Room Browsing**: View available rooms with detailed information
- **Room Search**: Search rooms by date, capacity, and amenities
- **Booking Management**: Make, view, and cancel room bookings
- **User Authentication**: Secure login and registration system
- **Profile Management**: Update personal information and view booking history
- **Responsive Design**: Mobile-friendly interface

### Admin Features

- **Room Management**: Add, edit, and delete hotel rooms
- **Booking Management**: View and manage all user bookings
- **User Management**: Monitor user accounts and activities
- **Dashboard**: Overview of hotel operations

## 🛠️ Tech Stack

### Frontend

- **React.js 18.3.0** - User interface framework
- **React Router DOM 6.23.0** - Client-side routing
- **Axios 1.6.8** - HTTP client for API calls
- **React DatePicker 6.9.0** - Date selection component
- **CSS3** - Styling and responsive design

### Backend

- **Spring Boot 3.3.0** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database management system
- **JWT (JSON Web Tokens)** - Stateless authentication
- **AWS S3** - File storage (for room images)
- **Maven** - Dependency management
- **Java 21** - Programming language

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 21** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Git** (for cloning the repository)

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hotel-booking-and-management
```

### 2. Frontend Setup (Ready to Run!)

The frontend is already configured and ready to run:

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

3. **Start the React development server**:

   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:7070` and should open automatically in your browser.

### 3. Backend Setup (Requires Additional Software)

**Prerequisites needed:**

- Java 21 (Download from https://adoptium.net/)
- Maven 3.6+ (Download from https://maven.apache.org/download.cgi)
- MySQL 8.0+ (Download from https://dev.mysql.com/downloads/mysql/)

**Once prerequisites are installed:**

1. **Database Setup**:

   - Start MySQL service
   - Create database: `CREATE DATABASE hotel_db;`
   - Update credentials in `backend/src/main/resources/application.properties`

2. **Backend Setup**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:4040`

### 4. Alternative: Quick Start with XAMPP

For easier setup, you can use XAMPP which includes MySQL:

1. Download XAMPP: https://www.apachefriends.org/
2. Install and start Apache and MySQL
3. Create database through phpMyAdmin
4. Update database credentials in application.properties

## 🔧 Configuration

### Backend Configuration

The main configuration file is located at `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=4040
spring.application.name=Hotel

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

### Frontend Configuration

The frontend is configured to run on port 7070 by default. You can modify this in `frontend/package.json`:

```json
{
  "scripts": {
    "start": "PORT=7070 react-scripts start"
  }
}
```

## 📁 Project Structure

```
hotel-booking-and-management/
├── backend/                          # Spring Boot backend
│   ├── src/main/java/com/dev/Hotel/
│   │   ├── controller/              # REST API controllers
│   │   ├── dto/                     # Data Transfer Objects
│   │   ├── entity/                  # JPA entities
│   │   ├── repo/                    # Repository interfaces
│   │   ├── service/                 # Business logic services
│   │   ├── security/                # Security configuration
│   │   └── utils/                   # Utility classes
│   └── src/main/resources/
│       └── application.properties   # Application configuration
├── frontend/                        # React.js frontend
│   ├── src/
│   │   ├── component/               # React components
│   │   │   ├── admin/              # Admin-specific components
│   │   │   ├── auth/               # Authentication components
│   │   │   ├── booking_rooms/      # Room booking components
│   │   │   ├── common/             # Shared components
│   │   │   ├── home/               # Home page components
│   │   │   └── profile/            # User profile components
│   │   └── service/                # API service functions
│   └── public/                     # Static assets
└── README.md                       # This file
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users can:

1. **Register** a new account
2. **Login** with email and password
3. **Access protected routes** with valid JWT tokens

## 🎯 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Rooms

- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `POST /api/rooms` - Add new room (Admin only)
- `PUT /api/rooms/{id}` - Update room (Admin only)
- `DELETE /api/rooms/{id}` - Delete room (Admin only)

### Bookings

- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🚀 Running in Production

### Backend

```bash
cd backend
mvn clean package
java -jar target/Hotel-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
# Serve the build folder with a web server like nginx or Apache
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure MySQL is running
   - Verify database credentials in `application.properties`
   - Check if the database `hotel_db` exists

2. **Port Already in Use**

   - Change the port in `application.properties` for backend
   - Change the port in `package.json` for frontend

3. **Dependencies Not Found**

   - Run `mvn clean install` for backend
   - Run `npm install` for frontend

4. **CORS Issues**
   - The backend includes CORS configuration
   - Ensure frontend is running on the correct port

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the application logs
3. Create an issue in the repository

---

**Happy Coding! 🎉**
