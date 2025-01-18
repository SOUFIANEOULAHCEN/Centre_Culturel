drop database Complexe;
create database Complexe;
use Complexe;

create table Administrateur(
	idAdmin int primary key auto_increment,
    nom varchar(50),
    prenom varchar(50),
    email varchar(255) unique,
    MotDePass varchar(50)
);

create table Utilisateur (
	idUser int primary key auto_increment,
    nom varchar(50),
    prenom varchar(50),
    email varchar(255) unique,
    MotDePass varchar(50)
);



create table Reservations(
	idReserve int primary key auto_increment,
    titre varchar(100),
    Description text,
    dateDebut date,
    dateFin date,
    statut varchar(50),
    flyer varchar(100),
    idUser int,
    foreign key (idUser) references Utilisateur (idUser)
    
);

create table Evenements (
	idEvent int primary key auto_increment,
    idReserve int,
    idUser int,
    foreign key (idReserve) references Reservations (idReserve),
    foreign key (idUser) references Utilisateur (idUser)
);

----------------------------------------------------------------------- 
insert into Administrateur (nom , prenom , email , MotDePass) values ('stifa' , 'hafssa' , 'hafssa.stifa@gmail.com' , '123');
--------------------------------------------------------- 
insert into Utilisateur (nom , prenom , email , MotDePass) values ('loukili' , 'hafssa' , 'hafssa.loukili@gmail.com' , '1234');
insert into Utilisateur (nom , prenom , email , MotDePass) values ('elkhayat' , 'meryem' , 'meryem.elkhayat@gmail.com' , '12345');
select * from Utilisateur;
select * from Administrateur;
------------------------------------------------- 



