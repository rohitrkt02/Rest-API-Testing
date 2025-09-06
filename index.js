const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended : false}));
// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
      ${users.map(
          // Removed extra parenthesis around 'user' and added .join('')
          (user) => `<li>${user.first_name}</li>`
      ).join('')} 
    </ul>
  `;
    res.send(html);
});

// REST API 
app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
    })
    .patch((req, res) => {
        // --- PATCH/EDIT A USER ---
        const id = Number(req.params.id);
        const body = req.body;
        
        // 1. Find the index of the user to edit
        const userIndex = users.findIndex((user) => user.id === id);

        // 2. Handle if user is not found
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // 3. Update the user object
        const updatedUser = { ...users[userIndex], ...body };
        users[userIndex] = updatedUser;

        // 4. Write the updated array back to the file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Could not save data." });
            }
            return res.json({ status: "success", user: updatedUser });
        });
    })
    .delete((req, res) => {
        // --- DELETE A USER ---
        const id = Number(req.params.id);

        // 1. Find the index of the user to delete
        const userIndex = users.findIndex((user) => user.id === id);

        // 2. Handle if user is not found
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // 3. Get the user before deleting
        const deletedUser = users[userIndex];

        // 4. Remove the user from the array using its index
        users.splice(userIndex, 1);

        // 5. Write the modified array back to the file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Could not save data." });
            }
            return res.json({ status: "success", message: `User with ID ${id} deleted.`, user: deletedUser });
        });
    });

app.post("/api/users" ,(req, res) => {
    // This route handles creating a new user.
    // 1. Get the data sent from the client (e.g., a form) from the request body.
    const body = req.body;

    // 2. Add the new user to the 'users' array. 
    // We use the spread operator '...' to merge the body data with a new ID.
    users.push({...body, id: users.length + 1});

    // 3. Persist the changes by writing the entire updated 'users' array back to the JSON file.
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        // 4. Send a response from inside the callback to confirm success.
        return res.status(201).json({ status: "Success", id: users.length});
    });
});
app.listen(PORT, () => console.log(`Server  Started at PORT:${'PORT'}`));

