const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
