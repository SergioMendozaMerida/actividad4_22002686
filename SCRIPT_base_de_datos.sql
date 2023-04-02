create database tasacambio;
use tasacambio;

create table registros( 
idOperacion int not null auto_increment, primary key(idOperacion),
precioCompra decimal(7,2),
precioVenta decimal(7,2),
montoIngresado decimal(7,2),
total decimal(7,2),
descripcion varchar(25)
);

ALTER TABLE registros 
ADD fecha date;
