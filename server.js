var fs = require('fs'),
    union = require('union');

var server = union.createServer({
  before: [
    function (req, res) {
      fs.readFile(__dirname + '/index.html',
	  function (err, data) {
		if (err) {
		  res.writeHead(500);
		  return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	  });
    }
  ]
});

server.listen(9090);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

//Ajout de Georges Kabuku 29 nov 2024
//*const express = require('express');
//*const cors = require('cors'); // Import du module cors
//*const app = express();


// Exemple de route
app.get('/pieces', (req, res) => {
    res.json({ message: "Voici les pièces" });
});

// Démarrer le serveur
app.listen(8081, () => {
    console.log('Serveur démarré sur le port 8081');
});

// Ajout du middleware CORS pour autoriser toutes les origines
app.use(cors());

// Exemple de route
app.get('/', (req, res) => {
  res.send('CORS est maintenant configuré pour autoriser toutes les origines !');
});

// Démarrer le serveur
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
