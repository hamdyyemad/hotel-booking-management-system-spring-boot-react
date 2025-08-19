# Installing Maven on Windows

## Method 1: Manual Installation (Recommended)

### Step 1: Download Maven

1. Go to https://maven.apache.org/download.cgi
2. Download "apache-maven-3.9.6-bin.zip" (or latest version)
3. Extract the ZIP file to `C:\Program Files\Apache\maven`

### Step 2: Set Environment Variables

1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click "Environment Variables"
3. Under "System Variables", click "New"
4. Variable name: `MAVEN_HOME`
5. Variable value: `C:\Program Files\Apache\maven`
6. Click OK
7. Find "Path" in System Variables, click "Edit"
8. Click "New" and add: `%MAVEN_HOME%\bin`
9. Click OK on all dialogs

### Step 3: Verify Installation

1. Open a new Command Prompt
2. Type: `mvn -version`
3. You should see Maven version information

## Method 2: Using Chocolatey (If you have it)

```cmd
choco install maven
```

## Method 3: Using Scoop (If you have it)

```cmd
scoop install maven
```

## Troubleshooting

- If `mvn` command is not recognized, restart your Command Prompt
- Make sure the PATH variable is set correctly
- Check that the Maven folder path is correct
