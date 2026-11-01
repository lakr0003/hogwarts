Grunden til at vi skriver teksten på denne måde er for at kave en skriftlig skabelon for hvordan koden bør udføres.
Det skriftlige som er skrevet skal følges i koden - det skal være ens.

///////////////////////// HOUSE ///////////////////////////////
GET all houses:
GET /houses
Hent alle houses fra databasen

    	Lav houses om til json
    	Returner dem med en 200

GET single house:
GET /houses/:id
Find id’et fra routen (requesten)
Find det element i databasen med det id

    Hvis der ikke var noget - return 404
    Ellers:
    	Lav element om til json
    	Returner det med en 200

///////////////////////// TEACHER ///////////////////////////////
GET all teachers:
GET /teachers
Hent alle teachers fra databasen

    	Lav teachers om til json
    	Returner dem med en 200

GET single teacher:
GET /teachers/:id
Find id’et fra routen (requesten)
Find det element i databasen med det id

    Hvis der ikke var noget - return 404
    Ellers:
    	Lav element om til json
    	Returner det med en 200

PUT teacher:
PUT /teachers/:id
Find id'et fra routen (requesten)
Find vores body-teacher (name og house_id)

    Prøv at opdatere teacheren i databasen med data fra body-teacheren,
      hvor id er id'et fra routen, og hent den opdaterede database-teacher

    Hvis der ikke var noget at hente fra databasen - return 404
    Ellers:
    	Lav database-teacheren om til json
    	Returner den med 200

POST teacher:
POST /teachers
Find vores body-teacher (name og house_id) fra body i requesten

    Opret en ny teacher i databasen med name og house_id fra body-teacheren
    - ved kald af query'en gemmes den, og databasen giver den et nyt id
    Hent den nye database-teacher (med id)

    Lav database-teacheren om til json
    Returner den med 201

DELETE teacher:
DELETE /teachers/:id
Find id'et fra routen (requesten)

    Prøv at slette teacheren med det id i databasen

    Hvis der ikke var noget at slette - return 404
    Ellers: return 204 (ingen indhold)

///////////////////////// STUDENT ///////////////////////////////
GET all students:
GET /students
Hent alle students fra databasen

    	Lav students om til json
    	Returner dem med en 200

GET single student:
GET /students/:id
Find id’et fra routen (requesten)
Find det element i databasen med det id

    Hvis der ikke var noget - return 404
    Ellers:
    	Lav element om til json
    	Returner det med en 200

PUT student:
PUT /students/:id
Find id'et fra routen (requesten)
Find vores body-student (name, house_id og year)

    Prøv at opdatere studenten i databasen med data fra body-studenten,
      hvor id er id'et fra routen, og hent den opdaterede database-student

    Hvis der ikke var noget at hente fra databasen - return 404
    Ellers:
    	Lav database-studenten om til json
    	Returner den med 200

POST student:
POST /students
Find vores body-student (name, house_id og year) fra body i requesten

    Opret en ny student i databasen med name og house_id fra body-studenten
    - ved kald af query'en gemmes den, og databasen giver den et nyt id
    Hent den nye database-student (med id)

    Lav database-studenten om til json
    Returner den med 201

DELETE student:
DELETE /students/:id
Find id'et fra routen (requesten)

    Prøv at slette studenten med det id i databasen

    Hvis der ikke var noget at slette - return 404
    Ellers: return 204 (ingen indhold)

///////////////////////// COURSE ///////////////////////////////
GET all courses:
GET /courses
Hent alle courses fra databasen

    	Lav courses om til json
    	Returner dem med en 200

GET single course:
GET /courses/:id
Find id'et fra routen (requesten)
Find det element i databasen med det id

    Hvis der ikke var noget - return 404
    Ellers:
    	Lav element om til json
    	Returner det med en 200

POST course:
POST /courses
Find vores body-course (name og teacher_id) fra body i requesten

    Opret et nyt course i databasen med name og teacher_id fra body-courset
    - ved kald af query'en gemmes det, og databasen giver det et nyt id
    Hent det nye database-course (med id)

    Lav database-courset om til json
    Returner det med 201

DELETE course:
DELETE /courses/:id
Find id'et fra routen (requesten)

    Prøv at slette courset med det id i databasen
      (courset's tilmeldinger i course_students slettes automatisk af databasen)

    Hvis der ikke var noget at slette - return 404
    Ellers: return 204 (ingen indhold)

PUT course (update name):
PUT /courses/:id
Find id'et fra routen (requesten)
Find name fra body i requesten

    Prøv at opdatere navnet på courset i databasen, hvor id er id'et fra routen,
      og hent det opdaterede database-course

    Hvis der ikke var noget at hente fra databasen - return 404
    Ellers:
    	Lav database-courset om til json
    	Returner det med 200

PUT course teacher (change teacher):
PUT /courses/:id/teacher
Find id'et fra routen (requesten)
Find teacher_id fra body i requesten

    Prøv at opdatere teacher_id på courset i databasen, hvor id er id'et fra routen,
      og hent det opdaterede database-course

    Hvis der ikke var noget at hente fra databasen - return 404
    Ellers:
    	Lav database-courset om til json
    	Returner det med 200

POST course student (add student):
POST /courses/:id/students
Find id'et på courset fra routen (requesten)
Find student_id fra body i requesten

    Opret en række i course_students-tabellen med course_id og student_id
      (koblingen mellem courset og studenten) og hent den nye række

    Lav rækken om til json
    Returner den med 201

DELETE course student (remove student):
DELETE /courses/:id/students/:student_id
Ikke implementeret endnu.
Tanken: find course-id og student_id fra routen, slet rækken i course_students
hvor begge matcher, og returner 404 hvis der ikke var noget at slette, ellers 204.
