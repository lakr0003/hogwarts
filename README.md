# Hogwarts Course Management System

Backend (Node.js, Express, ES modules) og PostgreSQL-database til at håndtere houses, teachers, students og courses.

## Kodestruktur

```
app.js            starter serveren og kobler routerne på
db.js             forbindelse til databasen (pg Pool)
routers/          kun routes --> kalder en controller
controllers/      request og response, statuskoder
repositories/     al SQL
database/         hogwarts.sql (tabeller og eksempel-data)
hogwarts-API-test/ endpoint-tests til Bruno
```

Flowet er: Client → router → controller → repository → database.

## Opsætning

1. Opret en database i PostgreSQL med navnet `hogwarts`.
2. Åbn `database/hogwarts.sql` i en query-console (pgAdmin eller DataGrip) og kør hele filen. Den opretter schemaet `hogwarts_api` med alle tabeller og eksempel-data.
3. Kopier `.env.example` til `.env`, og udfyld værdierne:

```
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=hogwarts
PG_USER=postgres
PG_PASSWORD=dit-password
```

4. Installer og start serveren:

```bash
npm install
npm run dev
```

Serveren kører på `http://localhost:3000`. (`npm start` starter den uden at genstarte ved ændringer.)

## Endpoints

### Houses

| Method | Route         | Beskrivelse      |
| ------ | ------------- | ---------------- |
| GET    | `/houses`     | get all houses   |
| GET    | `/houses/:id` | get single house |

### Teachers

| Method | Route           | Beskrivelse                                  |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/teachers`     | get all teachers                             |
| GET    | `/teachers/:id` | get single teacher                           |
| POST   | `/teachers`     | create new teacher (`name`, `house_id`)      |
| PUT    | `/teachers/:id` | update existing teacher (`name`, `house_id`) |
| DELETE | `/teachers/:id` | delete teacher                               |

### Students

| Method | Route           | Beskrivelse                                          |
| ------ | --------------- | ---------------------------------------------------- |
| GET    | `/students`     | get all students                                     |
| GET    | `/students/:id` | get single student                                   |
| POST   | `/students`     | create new student (`name`, `house_id`, `year`)      |
| PUT    | `/students/:id` | update existing student (`name`, `house_id`, `year`) |
| DELETE | `/students/:id` | delete student                                       |

### Courses

| Method | Route                   | Beskrivelse                              |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/courses`              | get all courses                          |
| GET    | `/courses/:id`          | get single course                        |
| POST   | `/courses`              | create new course (`name`, `teacher_id`) |
| PUT    | `/courses/:id`          | update course name (`name`)              |
| PUT    | `/courses/:id/teacher`  | change teacher of course (`teacher_id`)  |
| POST   | `/courses/:id/students` | add student to course (`student_id`)     |
| DELETE | `/courses/:id`          | delete course                            |

Endpointet til at fjerne en student fra et course (`DELETE /courses/:id/students/:student_id`) er ikke implementeret.

## Statuskoder

`200` OK (hent og opdater) · `201` Created (opret) · `204` No Content (slet) · `404` id findes ikke · `500` uforudsete fejl.

## Endpoint-tests

Testene ligger i mappen `hogwarts-API-test` og er lavet til Bruno.

1. Start serveren (`npm run dev`).
2. Åbn Bruno, vælg _Open Collection_, og vælg mappen `hogwarts-API-test`.
3. Kør requests'ene i mapperne `houses`, `teachers`, `students` og `courses`. Der er en test til hvert endpoint.
4. De requests der opretter noget (Create) tilføjer en ny række hver gang.
5. Delete-requests'ene peger på id 100, som ikke findes, og giver derfor 404. Vil du se 204, så kør først en Create, læs `id` i svaret, og skriv det id i Delete-URL'en.

## Pseudokode

Pseudokode for endpoints står i [PSEUDOKODE.md](PSEUDOKODE.md).

## Note

- Endpointet til at fjerne en student fra et course er ikke lavet.
