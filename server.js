const express= require('express');
const app= express(); /*app es una instancia de express. */
const cors=require('cors');
const mysql=require('mysql');
const bodyParser=require('body-parser');

app.use(cors());

// Configura body-parser como middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Creamos la conexion */
const conection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tienda'
});

/*Nos conectamos a la base de datos con una funcion callback, 
es una funcion que le paso otra funcion*/
const a=(parametro)=>{
    if(parametro){
        console,log(parametro);
        return;
    }
    console.log('Conexion establecida');
}

conection.connect(a);

//Hacemos la consulta para traernos todos los productos de la base de datos

app.get('/',(req,res)=>{
    conection.query("select * from tblproductos",(err,resultado,campos)=>{
        if(err){
            console.log(err);
            let response={
                error: err,
            }
            res.send(JSON.stringify(response));
        }
        res.send(JSON.stringify(resultado));
    });
});
app.post("/pagar",(req,res)=>{
    let total = 0;
    req.body.carrito.map(p => total += p.cantidad * p.precio);

    let consulta = `insert into tblventas (Fecha,Correo,Total,Status) 
    values (now(),?,${total},'pendiente')`;
    let statement = connection.query(consulta,[req.body.email], (err, result) => {
        if (err) throw err;
        console.log('Se insertaron ' + result.affectedRows + ' filas '+result.insertId );
    })
    console.log(req.body);

    res.send(JSON.stringify({ "resp": "ok" }));
})

/*3500 es el puerto en el que se va a levantar el servidor 
tengo que poner en la consola node .\server.js y me va a mostrar 
console.log('servidor escuchando en el puerto 3500'); */
app.listen(3500,()=>{
    console.log('servidor escuchando en el puerto 3500');
});