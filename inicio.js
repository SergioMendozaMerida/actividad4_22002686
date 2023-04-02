var primerDiv = document.getElementById('primer-div')
var compra = document.getElementById('compra')
var venta = document.getElementById('venta')
var cantidadIngresada = document.getElementById('cantidad-ingresada')
var botonComprar = document.getElementById('boton-comprar')
var botonVender = document.getElementById('boton-vender')
var resultado = document.getElementById('resultado')
var registrar = document.getElementById('registrar')
var consultar = document.getElementById('consultar')
var anterior = document.getElementById('anterior')
var siguiente = document.getElementById('siguiente')
var inFecha = document.getElementById('in-fecha')
var descripcion
var precioCompra
var precioVenta

window.addEventListener('load', function(){
    fetch('https://api.apis.net.pe/v1/tipo-cambio-sunat')
        .then(res=>res.json())
        .then(resJson=>{
            precioCompra = resJson['compra']
            precioVenta = resJson['venta']
            compra.value = precioCompra
            venta.value = precioVenta
        })   
})

botonComprar.addEventListener('click', function(){
        resultado.value = cantidadIngresada.value * precioVenta
        descripcion = 'Dolares a soles'
})

botonVender.addEventListener('click', function(){
    resultado.value = cantidadIngresada.value / precioCompra
    descripcion = 'Soles a Dolares'
})

registrar.addEventListener('click', function(){
    parseFloat(cantidadIngresada.value)
    parseFloat(resultado.value)
    window.comunication.insersion([null,precioCompra, precioVenta, cantidadIngresada.value,resultado.value,descripcion]);
})

consultar.addEventListener('click', function(){
    var i
    registrar.disabled = true
    cantidadIngresada.disabled = true
    anterior.disabled = false
    siguiente.disabled = false
    window.comunication.consultar('hola')
    window.comunication.consulta(function(event,args){
        i = args.length - 1
        compra.value = args[i].precioCompra
        venta.value = args[i].precioVenta
        cantidadIngresada.value = args[i].montoIngresado
        resultado.value = args[i].total
        inFecha.value = args[i].fecha
        anterior.addEventListener('click', function(){
            siguiente.disabled = false
            i = i - 1
            if (i < 0) {
                anterior.disabled = true
                alert('No hay mas valores para mostrar')
            }else{
                compra.value = args[i].precioCompra
                venta.value = args[i].precioVenta
                cantidadIngresada.value = args[i].montoIngresado
                resultado.value = args[i].total
                inFecha.value = args[i].fecha
            }
        })
        siguiente.addEventListener('click', function(){
            anterior.disabled = false
            i +=1
            if (i == args.length) {
                siguiente.disabled = true
                alert('No hay mas valores para mostrar')
            }else{
                compra.value = args[i].precioCompra
                venta.value = args[i].precioVenta
                cantidadIngresada.value = args[i].montoIngresado
                resultado.value = args[i].total
                inFecha.value = args[i].fecha
            }
        })
    })
})

