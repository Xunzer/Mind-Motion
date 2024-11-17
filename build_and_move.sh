
# Navigate to the frontend project directory
echo "Navigating to the frontend directory..."
cd frontend || exit

# Build the React app
echo "Running npm build..."
npm run build

# Go back to the project root directory
echo "Returning to project root..."
cd ..

# Remove old frontend files in Django
echo "Removing old files in backend/frontend_build..."
rm -rf backend/frontend_build/*

# Move the new build files to Django's frontend_build directory
echo "Moving new build files to backend/frontend_build..."
mv frontend/build/* backend/frontend_build/

echo "Build and move process complete."