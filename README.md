<!-- CI/CD implementation with git JENKINS Automation server  to ec2 instance-->

# Node_APP_CICD_With_JENKINS

This is a simple NodeJS application that is used to demonstrate CI/CD implementation with jenkins and EC2 instance.

## Prerequisites
how to create an ec2 instance
how to create a github repository

------------------------------------------------------------
------------------------------------------------------------
## Steps to create a CI/CD pipeline in Jenkins
### Step 1: create Application to be deployed and Ec2 instance
### Step 2: Create a Jenkins Server here we are going to use the EC2 instance to host out JENKINS server 
### Step 3: Create a Jenkins Job to build the application
### Step 4: Create a Jenkins Job to test the application
### Step 5: Create a Jenkins Job to deploy the application to the ec2 instance


------------------------------------------------------------
------------------------------------------------------------
------------------------------------------------------------
## Step 1: create Application to be deployed and Ec2 instance
Create a github repository with your application to be deployed in the ec2 instance
 use this repository-> https://github.com/rajeshreddy-T/git-workflow-test-with-node-and-ec2  and implement the First 4 steps present in the README.md file of the repository

## Step 2: Create a Jenkins Server here we are going to use the UBUNTU EC2 instance to host out JENKINS server
### Step 2.1: Install Jenkins on the EC2 instance Ubuntu 22.04 AMI
```
sudo apt update
sudo apt install openjdk-11-jdk
sudo apt install openjdk-11-jre

```
### Step 2.2: Add the Jenkins repository to the system
```
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
```
### Step 2.3: Install Jenkins
```
sudo apt update
sudo apt install jenkins
```
### Step 2.4: Start Jenkins
```
sudo service jenkins start
```
### Step 2.5: Enable Jenkins
```
sudo service jenkins enable
```


### Step 2.2: install plugins && Configure Jenkins
#### Step 2.2.1: Install plugins
```
Manage Jenkins -> Manage Plugins -> Available -> Git plugin -> Install without restart -> Save
Manage Jenkins -> Manage Plugins -> Available -> NodeJS plugin -> Install without restart -> Save
Manage Jenkins -> Manage Plugins -> Available -> AWS Credentials plugin -> Install without restart -> Save
Manage Jenkins -> Manage Plugins -> Available -> SSH Build Agents plugin -> Install without restart -> Save
```
#### Step 2.2.1: Configure Git
```
Manage Jenkins -> Configure System -> Global Tool Configuration -> Git -> Add Git
```
#### Step 2.2.2: Configure NodeJS
```
Manage Jenkins -> Configure System -> Global Tool Configuration -> NodeJS -> Add NodeJS
```
#### Step 2.2.3: Configure AWS
```
Manage Jenkins -> Configure System -> AWS Credentials -> Add Credentials
```
#### Step 2.2.4: Configure SSH
```
Manage Jenkins -> Configure System -> SSH Remote Hosts -> Add SSH Remote Host
```
#### Step 2.2.5: Configure Jenkins URL
```
Manage Jenkins -> Configure System -> Jenkins Location -> Jenkins URL
```

### Step 2.3: Create a Jenkins Job to build the application
#### Step 2.3.1: Create a new item
```
New Item -> Enter an item name -> Freestyle project -> OK
```
#### Step 2.3.2: Configure Source Code Management
```
Source Code Management -> Git -> Repository URL -> Credentials -> Add -> Jenkins -> Global credentials -> Add Credentials -> Kind: SSH Username with private key -> Username: ec2-user -> Private Key: Enter directly -> Private Key -> Passphrase: (leave blank) -> ID: git-workflow-test-with-node-and-ec2 -> Description: git-workflow-test-with-node-and-ec2 -> Add -> OK -> Save
```
#### Step 2.3.3: Configure Build Triggers
```
Build Triggers -> Poll SCM -> Schedule: * * * * *
```
#### Step 2.3.4: Configure Build Environment
```
Build Environment -> Delete workspace before build starts -> Add timestamps to the Console Output
```
#### Step 2.3.5: Configure Build
```
Build -> Execute shell -> Command:
```
```
#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Building application..."
npm run build
```
#### Step 2.3.6: Configure Post-build Actions
```
Post-build Actions -> Archive the artifacts -> Files to archive: nodeapp_v1.tar.gz -> Save
```
### Step 2.4: Create a Jenkins Job to test the application
#### Step 2.4.1: Create a new item
```
New Item -> Enter an item name -> Freestyle project -> OK
```
#### Step 2.4.2: Configure Source Code Management
```
Source Code Management -> Git -> Repository URL -> Credentials -> Add -> Jenkins -> Global credentials -> Add Credentials -> Kind: SSH Username with private key -> Username: ec2-user -> Private Key: Enter directly -> Private Key -> Passphrase: (leave blank) -> ID: git-workflow-test-with-node-and-ec2 -> Description: git-workflow-test-with-node-and-ec2 -> Add -> OK -> Save
```
#### Step 2.4.3: Configure Build Triggers
```
Build Triggers -> Poll SCM -> Schedule: * * * * *
```
#### Step 2.4.4: Configure Build Environment
```
Build Environment -> Delete workspace before build starts -> Add timestamps to the Console Output
```
#### Step 2.4.5: Configure Build
```
Build -> Execute shell -> Command:
```
```
#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Testing application..."
npm run test
```

### Step 2.5: Create a Jenkins Job to deploy the application to the ec2 instance
#### Step 2.5.1: Create a new item
```
New Item -> Enter an item name -> Freestyle project -> OK
```
#### Step 2.5.2: Configure Source Code Management
```
Source Code Management -> Git -> Repository URL -> Credentials -> Add -> Jenkins -> Global credentials -> Add Credentials -> Kind: SSH Username with private key -> Username: ec2-user -> Private Key: Enter directly -> Private Key -> Passphrase: (leave blank) -> ID: git-workflow-test-with-node-and-ec2 -> Description: git-workflow-test-with-node-and-ec2 -> Add -> OK -> Save
```
#### Step 2.5.3: Configure Build Triggers
```
Build Triggers -> Poll SCM -> Schedule: * * * * *
```
#### Step 2.5.4: Configure Build Environment
```
Build Environment -> Delete workspace before build starts -> Add timestamps to the Console Output
```
#### Step 2.5.5: Configure Build
```
Build -> Execute shell -> Command:
```
```
#!/bin/bash
echo "Installing dependencies..."
npm install
echo "Building application..."
npm run build
echo "Deploying application..."
npm run deploy
```
#### Step 2.5.6: Configure Post-build Actions
```
Post-build Actions -> Archive the artifacts -> Files to archive: nodeapp_v1.tar.gz -> Save
```

