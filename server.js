const express= require('express');
const app= express(); /*app es una instancia de express. */
const mysql=require('mysql');

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


/*3500 es el puerto en el que se va a levantar el servidor 
tengo que poner en la consola node .\server.js y me va a mostrar 
console.log('servidor escuchando en el puerto 3500'); */
app.listen(3500,()=>{
    console.log('servidor escuchando en el puerto 3500');
});