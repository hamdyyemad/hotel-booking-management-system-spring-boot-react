@echo off
echo ========================================
echo Starting Hotel Booking Backend
echo ========================================
echo.

echo Checking if we're in the right directory...
if not exist "backend\pom.xml" (
    echo ❌ Error: pom.xml not found. Please run this script from the project root directory.
    pause
    exit /b 1
)

echo ✅ Found backend directory
echo.

echo Checking Java...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is not installed or not in PATH
    echo Please install Java 21 from: https://adoptium.net/
    pause
    exit /b 1
)
echo ✅ Java is available

echo Checking Maven...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven is not installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
    echo See INSTALL-MAVEN.md for detailed instructions
    pause
    exit /b 1
)
echo ✅ Maven is available

echo.
echo ========================================
echo Building and Starting Backend...
echo ========================================
echo.

cd backend

echo Installing dependencies...
mvn clean install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:4040
echo Press Ctrl+C to stop the server
echo.

mvn spring-boot:run

pause

