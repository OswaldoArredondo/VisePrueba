drop database if exists compras;

Create database compras;

use compras;

CREATE TABLE producto (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(45) NOT NULL,
  marca varchar(45) NOT NULL,
  origen varchar(45) NOT NULL NOT NULL,
  precio float NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into producto (nombre,marca,origen,precio) values ('Redmi Note 11','Xiaomi','China',8999.99);
insert into producto (nombre,marca,origen,precio) values ('M4','Lanix','México',4499.00);
insert into producto (nombre,marca,origen,precio) values ('iPhone 11 Pro','Apple','Estados Unidos',11999.99);
insert into producto (nombre,marca,origen,precio) values ('iPhone 14 Pro','Apple','Estados Unidos',22999.99);
insert into producto (nombre,marca,origen,precio) values ('iPhone SE','Apple','Estados Unidos',6000.00);
insert into producto (nombre,marca,origen,precio) values ('Samsung S23','Samsung','Corea',23999.99);
insert into producto (nombre,marca,origen,precio) values ('Samsung Galaxy Z Flip 4','Samsung','Corea',16000.50);
insert into producto (nombre,marca,origen,precio) values ('Xiaomi POCO X4 Pro 5G','Xiaomi','China',7000.00);
insert into producto (nombre,marca,origen,precio) values ('Pixel XL','Google','Estados Unidos',13000.00);