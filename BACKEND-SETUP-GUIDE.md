# Backend Setup Guide

## Quick Summary

You need to install 3 things to run the backend:

1. **Java 21** ✅ (Already installed)
2. **Maven** ❌ (Need to install)
3. **MySQL** ❌ (Need to install)

## Step-by-Step Installation

### Step 1: Install Maven

**Option A: Manual Installation (Recommended)**

1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to `C:\Program Files\Apache\maven`
3. Add to PATH: `%MAVEN_HOME%\bin` where `MAVEN_HOME=C:\Program Files\Apache\maven`
4. See `INSTALL-MAVEN.md` for detailed instructions

**Option B: Using Chocolatey (if you have it)**

```cmd
choco install maven
```

### Step 2: Install MySQL

**Option A: Using XAMPP (Recommended for beginners)**

1. Download XAMPP from: https://www.apachefriends.org/
2. Install and start MySQL service
3. Create database `hotel_db` in phpMyAdmin
4. See `INSTALL-MYSQL.md` for detailed instructions

**Option B: Standalone MySQL**

1. Download from: https://dev.mysql.com/downloads/mysql/
2. Install and set root password
3. Create database `hotel_db`

### Step 3: Configure Database

Edit `backend/src/main/resources/application.properties`:

```properties
# For XAMPP (no password)
spring.datasource.username=root
spring.datasource.password=

# For standalone MySQL (with password)
spring.datasource.username=root
spring.datasource.password=your_password_here
```

### Step 4: Run the Backend

**Option A: Using the provided script**

```cmd
run-backend.bat
```

**Option B: Manual commands**

```cmd
cd backend
mvn clean install
mvn spring-boot:run
```

## Verification Steps

### Check if everything is installed:

```cmd
check-prerequisites.bat
```

### Test the backend:

1. Start the backend: `run-backend.bat`
2. Open browser to: http://localhost:4040
3. You should see Spring Boot startup logs

## Troubleshooting

### Common Issues:

1. **"mvn is not recognized"** - Maven not in PATH
2. **"Java is not recognized"** - Java not in PATH
3. **Database connection error** - MySQL not running or wrong credentials
4. **Port 4040 already in use** - Change port in application.properties

### Getting Help:

- Check the logs in the terminal
- Verify all prerequisites with `check-prerequisites.bat`
- Make sure MySQL service is running
- Ensure database `hotel_db` exists

## Next Steps

Once the backend is running:

1. The frontend can connect to it
2. You can test the API endpoints
3. The full application will be functional
