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

## June 3, 2022
---
Today I spent a lot of time proofing the code for the inventory microservice. I did a lot of minor rewrites, fixed typos, spruced things up, debugged some errors after thorough testing on both the admin panel and every http request with a view function written for it for all of the models inside of inventory. I even went through and started adding comments to the code in particularly weird or complicated bits -- parts that I looked at and, subjectively, said, "Hey, Me! I don't know if I'll understand this portion of code in 3 months if I came back inside this repository! Let's clarify things here." So, that was a lot of fun. 

Then I spent some time pair coding with Jaiden and debugging some issues in our employee microsevice -- code I believe he had mostly written by himself. I believe we got things pretty well and ironed out over there in that microservice. We were both happy with the pair coding session, so I hopped over to a breakout room where Nicholas, Jordan, and Cindy were working on the rather difficult customer microservice -- where our pesky quizzes live.

We finished the day in customer, getting it most of the way finished before running into some weird, complicated, and entirely unfamiliar errors before we decided to call it for an exhaustive week as a group. 

Things were very tough for me this week, and I feel bad for my group for having to deal with my situation when the pedal is really hitting the metal. I drove to Phoenix with my family last weekend to visit my younger brother and celebrate his recent graduation from culinary school, and the internet at our hotel I've been staying at has been extremely difficult to work with and around. Frequently, I was dropped from the Zoom call. Frequently, I had to turn off my camera and mute my mic because my son was taking a nap in the hotel room with me. We made it work, and I still got a lot done and a lot of pair coding in -- we found some luck working on Discord and in smaller breakout groups on my connection -- so I think it was still a successful week. Just don't want the group thinking I'm not dedicated to a project that will be in all of our professional portfolios!

One success for me this week was my discovery how much I enjoyed reviewing the code, proofing the code, and writing up comments in the code! I know a lot of people find technical writing "boring," but I'll have to admit that I find myself really enjoying it! I just hope the group doesn't think I'm trying to micromanage... Maybe we can do some group proofing of the other microservices when we find time. I'm super excited to get the backend done or at least serviceable next week so we can really move full speed in to the frontend -- where I think we'll find a lot of fun designing the quizzes and overall user experience. The group seems to all have an eye for detail, and brings a lot of unique design experience and styles to the end product. I love it!