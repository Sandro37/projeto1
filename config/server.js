let express = require('express');
const expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");   

app.listen(port, function(){
    console.log("Servidor rodandoo na porta ", port);
})

module.exports = app