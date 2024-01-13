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
