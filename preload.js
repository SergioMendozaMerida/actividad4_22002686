const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld(
    'comunication',
    {
        insersion: (datos) => ipcRenderer.send('insersion',datos)
        ,
        consultar: (datos) => ipcRenderer.send('consultar',datos)
        ,
        consulta: (callback) => ipcRenderer.on('consulta',callback)
    }
)