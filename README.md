# Prove me wrong!

Projekat I i II iz predmeta Napredne baze podataka. _Prove me wrong_ je platforma za diskutovanje o raznim temama, organizovano u sobama. Svaka soba sadrži objave i komentare o datoj temi, kao i ćaskanje koje implementira real-time komunikaciju.

//TODO Tim

- Milan Lukić 17728
- Andrija Mitić 17805
- Luka Kocić 17714

## Tehnologije

- Neo4j
- Redis
- .Net 7.0
- React & Typescript
- Material UI

## Pokretanje

Pre pokretanja projekta pokrenuti Redis i Neo4j baze na portovima **6079** i **7687**, respektivno. Podrazumevani neo4j korisnik je _neo4j_ sa lozinkom _neo4jneo4j_.
Prilikom prvog pokretanja generisaće se test podaci.

Backend:

```
cd Backend
dotnet restore
dotnet run
```

Frontend:

```
cd Frontend
npm i
npm run start
```

Prilikom prvog pokretanja generisaće se test podaci.

## Redis

Redis je u projektu korišćen:

1. Za ćaskanje, uz pomoć Publisher / Subscriber modela
2. Za čuvanje komentara objava
3. Za čuvanje sesija

## Neo4j

## Preview

### Prijavljivanje

![Prijava](/assets/Screenshot_7.jpg)

### Registracija

![Registracija](/assets/Screenshot_8.jpg)

### Početna stranica

![Početna stranica](/assets/Screenshot_4.jpg)

### Zahtevi za prijateljstvo

![Obaveštenja](/assets/Screenshot_3.jpg)

### Pretraga korisnika

![Pretraga korisnika](/assets/Screenshot_2.jpg)

### Filtriranje tema

![Filtriranje tema](/assets/Screenshot_9.jpg)

### Kreiranje teme

![Kreiranje teme](/assets/Screenshot_5.jpg)

### Objave i komentari na temu

![Objave i komentari](/assets/Screenshot_16.jpg)

### Ćaskanje

![Ćaskanje](/assets/Screenshot_15.jpg)

### Kreiranje Objave

![Kreiranje teme](/assets/Screenshot_10.jpg)

### Podešavanje interesovanja na profilu

![Interesovanja](/assets/Screenshot_11.jpg)

### Profil korisnika

![Profil](/assets/Screenshot_12.jpg)
