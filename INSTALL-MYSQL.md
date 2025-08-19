# Installing MySQL on Windows

## Method 1: Using XAMPP (Recommended for Beginners)

### Step 1: Download and Install XAMPP

1. Go to https://www.apachefriends.org/
2. Download XAMPP for Windows
3. Run the installer
4. During installation, make sure "MySQL" is selected
5. Complete the installation

### Step 2: Start MySQL

1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. The MySQL service should start (green status)

### Step 3: Create Database

1. Click "Admin" next to MySQL (opens phpMyAdmin)
2. Or go to http://localhost/phpmyadmin
3. Click "New" on the left sidebar
4. Enter database name: `hotel_db`
5. Click "Create"

### Step 4: Update Application Properties

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=
```

(Leave password empty for default XAMPP setup)

## Method 2: Standalone MySQL Installation

1. Go to https://dev.mysql.com/downloads/mysql/
2. Download MySQL Community Server
3. Run the installer
4. Set a root password (remember this!)
5. Update application.properties with your password

## Method 3: Using Chocolatey

```cmd
choco install mysql
```

## Troubleshooting

- If MySQL won't start, check if port 3306 is already in use
- Default XAMPP MySQL has no password
- Make sure to create the database before running the backend
