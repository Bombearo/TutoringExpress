const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/items', (req, res) => {
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const items = JSON.parse(data);
        res.json(items);
    });
});

app.post('/items', (req, res) => {
    // Read the existing items from the file
    fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const items = JSON.parse(data);

        // Get the new item data from the request body
        const newItem = req.body;

        // Add the new item to the items array
        items.push(newItem);

        // Write the updated items back to the file
        fs.writeFile('items.json', JSON.stringify(items), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.status(200).send('Item added successfully');
        });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})