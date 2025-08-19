@echo off
echo ========================================
echo Checking Prerequisites for Backend Setup
echo ========================================
echo.

echo Checking Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java is not installed or not in PATH
    echo Please install Java 21 from: https://adoptium.net/
) else (
    echo ✅ Java is installed
)
echo.

echo Checking Maven...
mvn -version
if %errorlevel% neq 0 (
    echo ❌ Maven is not installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
) else (
    echo ✅ Maven is installed
)
echo.

echo Checking MySQL...
mysql --version
if %errorlevel% neq 0 (
    echo ❌ MySQL is not installed or not in PATH
    echo Please install MySQL or XAMPP from: https://www.apachefriends.org/
) else (
    echo ✅ MySQL is installed
)
echo.

echo ========================================
echo Prerequisites Check Complete
echo ========================================
pause

