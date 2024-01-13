# DT162G_Projekt

Detta projekt är en webbplats som ska fungera lite som en forumplattform. Projektet är skapat med NodeJS, Express, MongoDB, Mongoose i backend, frotend är skapat med React och CSS-ramverket Bootstrap. 

## Databasen
Databasen är uppbyggt med hjälp av MongoDB och Mongoose används för att skapa schemat för databasen. Databasen består av följande collections: 
* **Post** - Här lagras alla inlägg tillsammans med tillhörande kommentarer.
* **Comment** - Här lagras alla kommentarer
* **User** - Här lagras användarnamn och lösenord på användaren.

## API - anropen

| HTTP-metod  | Rutt      | Funktion        |
|-------------|-----------|-----------------|
|POST         | /posts    | Posta ett nytt inlägg |
|GET          | /posts    | Hämtar alla inlägg |
|GET          | /posts/{id}| Hämtar enskilt inlägg med id |
|GET          | /user     | Hämtar användarens inlägg |
|PUT          | /posts/{id} | Uppdaterar ett specifikt inlägg |
|GET          | /most-recent | Hämtar det senaste inlägget från databasen |
|DELETE       | /posts/{id}| Raderar ett specifikt inlägg|
|POST         | /posts/{id}/comments | Lägger till en kommentar på ett inlägg|
|POST         | /login     | Loggar in användaren |
|POST         | /register  | Registrerar en användare |
|POST         | /logout    | Loggar ut en användare |
|GET          | /user_info | Hämtar användarens användarnamn |

## Quick start guide
Klona ner repot lokalt till valfri texteditor. Följ sedan nedan steg för att starta igång backend och frontend. 

**OBS! Se till att du har MongoDB installerat på din enhet!**

### 1. Databasen
Innan något kan påbörjas så behöver databasens alla collections skapas, namnet på databasen är "blog" och den iunnehåller följande collections: 
* posts
* users
* comments

### 2. Backend
1. Öppna terminalen och gå in i server mappen.
2. Skriv sedan "npm install" eller "npm i" för att installera alla paket.
3. Skriv sedan "node server.js" för att starta igång servern.
4. Sist så behöver en .env fil skapas med en hemlig nyckel. Skapa en .env fil och skriv JWT_SECRET=Namnpådinnyckel

### 3. Frontend
1. Öppna en ny terminal och gå in i mappen client och sedan react-project.
2. Skriv sedan "npm install" eller "npm i" för installation av alla paket.
3. Sist skrivs "npm run dev" för att starta React applikationen.
4. Börja sedan med att registrera dig asom användare på webbplatsen och logga sedan in. 




