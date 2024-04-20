create database diario;

use diario;

create table diario(
id int primary key auto_increment,
titulo varchar(120) not null,
sonho text not null,
data_sonho datetime not null
);

