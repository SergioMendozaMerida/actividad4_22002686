var compra = document.getElementById('compra')
var venta = document.getElementById('venta')
var cantidadIngresada = document.getElementById('cantidad-ingresada')
var botonComprar = document.getElementById('boton-comprar')
var botonVender = document.getElementById('boton-vender')
var resultado = document.getElementById('resultado')
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
})

botonVender.addEventListener('click', function(){
    resultado.value = cantidadIngresada.value / precioCompra
})