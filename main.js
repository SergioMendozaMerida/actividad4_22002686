const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path')
const mysql = require('mysql2')

//creando la conexion a base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CerjioCerjio',
    database: 'tasacambio'
})

var ventana

function createWindow(){
    ventana = new BrowserWindow({
        width: 500,
        heigth: 720,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    });
    ventana.loadFile('inicio.html')
}

ipcMain.on('insersion', function(event, args){
    conexion.promise().execute('INSERT INTO registros VALUES(?,?,?,?,?,?,current_timestamp())',
    args)
})

ipcMain.on('consultar', function(event, args){
    conexion.query(
        'SELECT * FROM registros',
            function(err, result, fields){
                if(err){
                    console.log(err)
                }
                    ventana.webContents.send('consulta', result)
            }
    )
})

app.whenReady().then(createWindow)
