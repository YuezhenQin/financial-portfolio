#!/bin/bash
bold=$(tput bold)
normal=$(tput sgr0)
red=$(tput setaf 1)
green=$(tput setaf 2)

set Path = 

if [ -d "financial-portfolio-backend" ]; then
	echo '⚠️ Existing folder detected, deleting...';
  rm -rf financial-portfolio-backend
fi

# Set the repository URL
REPO_URL="https://github.com/YuezhenQin/financial-portfolio-backend.git"

# Clone the repository
echo "📦 Cloning the repository from ${bold} $REPO_URL...${normal}"
git clone $REPO_URL > /dev/null || { echo "Failed to clone repository"; exit 1; }

# Navigate into the repository directory
#cd financial-portfolio-backend || { echo "${red} Failed to enter repository directory${normal}"; exit 1; }

# Install, test, and start for financial-portfolio-backend
echo "⏳ ${bold}Handling financial-portfolio-backend...${normal}"
cd financial-portfolio-backend || { echo "${red}Failed to enter financial-portfolio-backend directory${normal}"; exit 1; }

echo "Installing dependencies... please wait"
npm install > /dev/null || { echo "${red}Failed to install dependencies for financial-portfolio-backend${normal}"; exit 1; }

echo "Running tests... please wait"
npm test > /dev/null || { echo "${red}Tests failed for financial-portfolio-backend${normal}"; exit 1; }

echo "🚀 ${bold}Starting the application backend...${normal}"
npm start &
backend_pid=$! 

# Go back to the root directory
cd .. || { echo "Failed to return to the root directory"; exit 1; }

# Set the repository URL
REPO_URL_FRONT="https://github.com/YuezhenQin/financial-portfolio-frontend.git"

# Clone the repository
echo "📦 Cloning the repository from ${bold} $REPO_URL_FRONT...${normal}"
git clone $REPO_URL_FRONT > /dev/null || { echo "Failed to clone repository"; exit 1; }

# Install, test, and start for financial-portfolio-frontend
echo "⏳ ${bold}Handling financial-portfolio-frontend...${normal}"
cd financial-portfolio-frontend || { echo "Failed to enter financial-portfolio-frontend directory"; exit 1; }

echo "Installing dependencies... please wait"
npm install > /dev/null || { echo "Failed to install dependencies for financial-portfolio-frontend"; exit 1; }

# if [ -d "__test__" ]; then
#     echo "Running tests..."
#     npm test > /dev/null  || { echo "Tests failed for $dir"; exit 1; }
# else
#     echo "__test__ directory not found. Skipping tests for $dir."
# fi
# echo "🚀 ${bold}Starting the application..."${normal}
# npm start &
# frontend_pid=$! 

# Wait for both background processes to complete
sleep 2

echo "✅${green}${bold}Deployment completed successfully.${normal}"

echo 'Press any touch to stop all servers'
read -n 1 -s  # Wait for user input

echo "Stopping the app"
# kill $frontend_pid > /dev/null
kill $backend_pid > /dev/null

wait

echo -e "\n \n ${bold}Done, See u next time!!! 👋 ${normal}"
