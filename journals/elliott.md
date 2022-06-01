## May 27, 2022
---

We discussed the architecture of our project on this day, particularly about the microservices and which parts of the app would get their own microservices. The microservices we decided to include are:

- Accounts, Inventory, Customer, and Employee

We also briefly discussed employing both Django and FastAPI in this project, depending on the microservices. We mentioned using FastAPI in the Inventory microservice specifically, so that each one of us gets the chance to write one of the 5 major HTTP requests for the microservice.

Unfortunately, I developed a migraine some point shortly after this conversation, so I missed the rest of the day working on the Docker Compose file and the quiz questions!


## May 31, 2022
---
Today, we worked on:

- Updating the docker-compose.yml to begin bringing up our microservices
- Creating the volumes for the database and microservices

We ran into some blockers when bringing things up for the first time, including the wonderful joys of running into our create-multiple-databases.sh file being non-executable since it was created on a Mac. Because of those blockers, the group split up and Jaiden and I remained to work with staff on getting our containers up and spinning for the first time.

We had some good discussions yesterday, and continued to discuss how the project will take shape not just immediately, with immediate priorities on our issues board being identified by Jordan, Cindy, and Nicholas, but also longterm and beyond. We are all very excited to jump into the code and get this thing going!