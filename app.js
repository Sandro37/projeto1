const app = require("./config/server")
const dbConnection = require("./config/dbServer")

///TODO OS GET AQUI
app.get('/', function(req, res){
    res.render("../views/index");
})

app.get('/cadastrar', function(req, res){
    res.render("../views/cadastro");
})

app.get('/login', function(req,res){
    res.render("../views/login")
    
})

app.get('/inserirCidade', function(req,res){
    res.render("../views/inserirCidade")
    
})

app.get("/show", function(req, res){
    let connection = dbConnection();

    let sql = 'select * from Cidade';

    connection.query(sql, function(error, result){
        connection.end();
        res.render("../views/show", {data: result})
    })
})

///routes
app.route('/edit/:id').get((req, res)=>{
    var id = req.params.id;

    let connection = dbConnection();
    let sql = 'select * from Cidade where idCidade = ' + id;

    connection.query(sql, (error, results, fields)=>{
        if(error){
            return console.error(error.message)
        }
        connection.end();
        res.render("../views/edit", {data: results})
    })
}).post((req, res)=>{
    var id = req.params.id;
    var cidade = req.body.cidade;
    var melhoria = req.body.melhoria;

    let connection = dbConnection();
    let sql = 'update Cidade set cidade = ?, melhoria = ? where idCidade = ?'

    let data = [cidade, melhoria, id];

    connection.query(sql, data, (error, results, fields)=>{
        if(error){
            return console.error(error.message);
        }
        connection.end();
        res.redirect("/show");
        console.log("Atualizado no banco de dados");
    })
})


app.route("/delete/:id").get((req, res) =>{
    var id = req.params.id;

    
    let connection = dbConnection();
    let sql = 'delete from cidade where idCidade = ' + id; 

    connection.query(sql, (error, results, fields)=>{
        if(error){
            return console.error(error.message)
        }
        connection.end();
        console.log("Atualizado no banco de dados");
        res.redirect('/show')
    })
})



///TODOS OS POST AQUI
app.post("/show", function(req,res){

    let connection = dbConnection();
    let sql = "insert into Cidade (cidade, melhoria) values ?";
    let values = [
        [req.body.txtCidade, req.body.txtMelhoria]
    ]

    connection.query(sql, [values], (err, results, fields) =>{
        if(err){
            return console.error(err.message);
        }
        console.log('Valores inseridos: ' + results.affectedRows)
        connection.end();
        res.redirect("/show");
    });
})

