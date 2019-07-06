var http = require('http');
const fs = require('fs')

//lendo os parametros passados pela linha de comando
var path = process.argv[2];

var server = http.createServer(function (req, res) {
//a readdir é assincrona, a readdirSync é sincrona
fs.readdir(path, function(erro, pastas){
        pastas.forEach(element => {
            console.log(element)
            res.write(element+"\n")
            res.write("\n")
        });
        res.end();
        if (erro) {
            console.log("deu pau")
            return console.error(erro)
        }
    });        
})
server.listen(3000);