drop database Complexe;

create database Complexe;

use Complexe;

create table Administrateur (
    idAdmin int primary key auto_increment,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    email varchar(255) unique NOT NULL,
    MotDePass varchar(50) NOT NULL
);

create table Utilisateur (
    idUser int primary key auto_increment,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    email varchar(255) unique NOT NULL,
    MotDePass varchar(50) NOT NULL
);

create table Reservations (
    idReserve int primary key auto_increment,
    titre varchar(100) NOT NULL,
    Description text NOT NULL,
    dateDebut date NOT NULL,
    dateFin date NOT NULL,
    statut varchar(50),
    flyer varchar(100) NOT NULL,
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

-- Insertion des administrateurs
insert into
    Administrateur (nom, prenom, email, MotDePass)
values (
        'admin1',
        'system',
        'admin1@example.com',
        'adminpass1'
    ),
    (
        'admin2',
        'manager',
        'admin2@example.com',
        'adminpass2'
    );

-- Insertion des utilisateurs
insert into
    Utilisateur (nom, prenom, email, MotDePass)
values (
        'Doe',
        'John',
        'john.doe@gmail.com',
        'pass123'
    ),
    (
        'Smith',
        'Jane',
        'jane.smith@yahoo.com',
        'pass456'
    ),
    (
        'Brown',
        'Charlie',
        'charlie.brown@outlook.com',
        'pass789'
    );

-- Insertion des réservations
insert into
    Reservations (
        titre,
        Description,
        dateDebut,
        dateFin,
        statut,
        flyer,
        idUser
    )
values (
        'Conference',
        'A tech conference about AI and ML',
        '2025-02-01',
        '2025-02-03',
        'Confirmed',
        'flyer1.jpg',
        1
    ),
    (
        'Workshop',
        'A hands-on workshop on React.js',
        '2025-03-10',
        '2025-03-12',
        'Pending',
        'flyer2.jpg',
        2
    ),
    (
        'Seminar',
        'A seminar on cybersecurity trends',
        '2025-04-15',
        '2025-04-16',
        'Cancelled',
        'flyer3.jpg',
        3
    );

-- Insertion des événements
insert into
    Evenements (idReserve, idUser)
values (1, 1),
    (2, 2),
    (3, 3);

SELECT * FROM Administrateur;

SELECT * FROM Utilisateur;

SELECT * FROM Reservations;

SELECT * FROM Evenements;