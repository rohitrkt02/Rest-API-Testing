# Rest-API-Testing
This project demonstrates REST API testing with JavaScript.
It uses fetch to send API requests (GET, POST, PUT, PATCH, DELETE) and test endpoints with mock data.
You can also use Postman alongside this project to manually verify and test API behavior.

📂 Project Structure
Rest-API-Testing/
├── index.js             # Main script to test REST APIs
├── MOCK_DATA.json       # Mock data file used for API requests
├── package.json         # Project metadata and dependencies
└── package-lock.json    # Dependency lock file

⚡ Features

API testing using different HTTP methods:

GET – Fetch data

POST – Create new records

PUT – Replace existing data

PATCH – Update partial data

DELETE – Remove data

Uses mock JSON data (MOCK_DATA.json) for testing

Works well with Postman for manual API verification

🛠️ Requirements

Node.js
 (v14 or above)

Postman
 (optional, for manual testing)

🚀 Setup & Installation

Clone this repository:

git clone https://github.com/rohitrkt02/Rest-API-Testing.git
cd Rest-API-Testing


Install dependencies:

npm install

▶️ Usage

Run the program with:

node index.js


By default, the script:

Reads test data from MOCK_DATA.json

Sends requests (e.g., POST, GET, DELETE) to your API endpoint

Logs the responses in the console

📌 Example (from index.js)
const fetch = require("node-fetch");
const mockData = require("./MOCK_DATA.json");

// Example: POST request with mock data
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify(mockData[0]), // using first record from MOCK_DATA.json
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
  .then((res) => res.json())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("Error:", err));

🔗 Postman Integration

Open Postman

Create new requests for the same endpoints (GET, POST, etc.)

Use MOCK_DATA.json as request body where applicable

Compare responses with your Node.js script results

🤝 Contributing

Feel free to contribute:

Fork this repo

Create a feature branch: git checkout -b feature/my-feature

Commit changes: git commit -m "Added new test case"

Push branch: git push origin feature/my-feature

Open a Pull Request
