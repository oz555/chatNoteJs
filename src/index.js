const http = require('http');
const path = require('path');

const express = require('express');//uso de dependencias exprese
const socketio = require('socket.io');//realiza una conexion constante cliente-servidor


const app = express();//ejecucion del framework
const server = http.createServer(app);// ejecuta la conexion cliente-servidor constantemente
const io = socketio.listen(server);

//settings

app.set('port', process.env.PORT || 3000)

require('./sockets')(io);


//console.log(__dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));//envia la carpeta public al navegador cada vez que alguien entra

// ejecucion del metodo lisent . activa el puerto
server.listen(app.get('port'), () => {
	console.log('servidor del puerto', app.get('port'));
});
//echo con la pagina fazt chat con javascript youtube