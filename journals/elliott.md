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


## June 1, 2022
---
Today, Nicolas, Jaiden, and I worked in the Inventory microservice. We started building out all of our data models, model encoders, and view functions for the inventory microservice.

We ran into some blockers when trying to conceptualize how best to build our backend, particularly our inventory database so that we would follow at least the first three levels of database normalization. Trying to figure out how foreign keys in Django related to business keys in postgres, and which things needed their own model class and table was challenging.

A win I had today was probably finally getting a clear mental model of exactly what the "on_delete" property in Django does. I've previously just tried to copy examples we've done in the past when working with Foreign Keys, but it's nice now to have a better idea of the relation between the two models and which direction things will delete in.


## June 2, 2022
---
Today I had incredibly bad luck with my connection and the hotel room we're staying in, so I hardly had any contact time with my team today. We were able to discuss the quiz questions and added a few more questions to fill out the quizzes. I reviewed a lot of the code that we've written so far and edited some things here and there. I also spent some time starting up our accounts microservice, and writing the back end in that app.

Didn't really have a win today, to be honest. I wish I was not having so much difficulty working with and communicating with my team. Luckily, tomorrow is our last day on vacation, so hopefully things will run smoother for us once I am back home. 