Start a three.js project with the following:

mkdir project
cd project 
npm init -y
npm install vite
npm install three


touch index.html file with:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03 - First Three.js Project</title>
</head>
<body>
    <h1>Soon to be a Three.js website</h1>
</body>
</html>

Edit package.json file:

"dev": "vite",
"build": "vite build"
