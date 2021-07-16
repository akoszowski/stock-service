This is solution to the Beside the Park Internship recruitment task

## Task

**_Stock-service_**

---

### The brief of the solution to be built
The goal is to build a system that will collect and store in a relational, normalised database stock quotes. 
For this purpose the system has to provide a public/open GraphQL. The API allows receiving stock quotes from other services
(there can be multiple clients sending stock quotes concurrently). The client should be able to send the instrument ticker, 
the timestamp, and the price of the specific instrument in the specific transaction in a single request.

---

###The scope of work
- Setup a git repository (free/public) on github for the project.
- Design a data model (please provide a document the ERD on a logical level - you can use i.e. draw.io with google docs for this purpose or other tool of your choice)
- Design an API (the deliverable is also a document with the API design,  you can use i.e. google doc or  openApi if you choose to build a REST API, GraphQL is usually self documenting).
- Build the solution in NestJS trying to add a commit to the git repository for each new chunk of work completed. 
- Provide automated tests at least on a unit tests level. Please include in the testing the edge cases for the concurrent processing of the received quotes.

---

### Solution
Solution has been build using technologies:
- NestJS
- GrapQL
- Prisma (ORM)
- dockerised PostgreSQL

Database consistency, while processing concurrent requests, has been ensured with prisma nested writes and model unique constraints.

However, due to some issues with mocking Prisma client I was unable to provide automated tests on the unit tests level.
