# Rest-API-Testing

A simple project for testing REST APIs with JavaScript.
It uses fetch to send requests (GET, POST, PUT, PATCH, DELETE) and mock data from MOCK_DATA.json.
You can also verify APIs manually using Postman.

📂 Project Structure
Rest-API-Testing/
├── index.js         # Main script
├── MOCK_DATA.json   # Mock test data
├── package.json     # Dependencies
└── package-lock.json

⚡ Features

Test APIs with multiple HTTP methods

Uses mock JSON data

Compatible with Postman

🛠️ Setup
git clone https://github.com/rohitrkt02/Rest-API-Testing.git
cd Rest-API-Testing
npm install


Run:

node index.js

📌 Example
const fetch = require("node-fetch");
const mockData = require("./MOCK_DATA.json");

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify(mockData[0]),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
  .then(res => res.json())
  .then(data => console.log(data));

🔗 Postman

Import endpoints in Postman

Use MOCK_DATA.json for request body

Compare results with script output
