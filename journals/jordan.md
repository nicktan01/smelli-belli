## Jordan's Journal


## June 2, 2022
Morning: Finalized quiz question and answer options. Updated docs to reflect our decisions. 

Afternoon: Cindy, Nicholas, and I worked on the models for the customer microservice. We had to deal with some docker/mac vs windows troubleshooting. We were able to log in to the django admin page but we need to revisit our models. 

## June 1, 2022
Morning: Started working on FastAPI set up for the customer microservice with Cindy. 

Afternoon: After some further research and discussion with Cindy and Jaiden, as a whole team we decided to proceed with a django backend. After making this switch, Elliott added the necessary folders and we divided up the work for the models/paths/views for customer and employee microservices. We decided to hold off on the account microservice until after an authentication lecture to help guide us. 

## May 31, 2022
We started working on editing the docker-compose file. Cindy, Nicholas, and I split off to start making issues in gitlab to begin organizing our workflow. 

In doing this we decided that our quiz questions will just be a static table in our database so we elimnated the need for a model for the quiz questions.

## May 27, 2022

Today we worked all together to determine our monolith and microservices. We also discussed whether we want to use Django or FastAPI, we determined we will be using Django for the bulk of our application and will use FastAPI for one of the microservices.

In the afternoon, Cindy, Jaiden, Nicholas, and I worked on establishing the questions and relations to scents for the two scent profile quizzes. Cindy, Jaiden, and I then worked on creating our first draft of the docker-compose.yaml 