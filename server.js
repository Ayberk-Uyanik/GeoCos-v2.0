// Importing Express //
const express = require('express');
const app = express();

// Static Files //
app.use(express.static('public'));
app.use ('/css', express.static(__dirname + 'public/css'));
app.use ('/img', express.static(__dirname + 'public/img'));
app.use ('/js', express.static(__dirname + 'public/js'));

// Rendering Pages //
app.get('/public', (req, res) => {
  res.sendFile(__dirname + 'index.html')
})
 
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});