## Jordan's Journal

## June 7, 2022
Morning: Started work on the front end product shopping pages. 

Afternoon: Continued working on the product shopping page front end. I got the all products shopping page displaying products in a responsive card view. I want to change the image field to be optional, if left blank I have it set up to insert a default image. I think we also need to add a field to the product model to categorize the item at either a home or body product to make filtering the producs easier. Later tonight I plan to work on a logo and other visuals to use on our frontend. 
## June 6, 2022
Morning: Fixed our leftover Friday problem with the customer microservice. Created issues for the Fixer and Google Maps API integrations - we might be passing on the currency selector as this seems quite complicated. Cindy, Nicholas, and I worked on the integration of the Google Maps API by starting with making the react front end for the About page.

Afternoon: Worked on the maps integration and troubleshot how to add markers to the map. 
## June 3, 2022
Morning: Cindy, Nicholas, and I worked on the models and wrote two of the poller functions for the customer service. Then we worked on the encoders and the views for the customer microservice

Afternoon: We continued working on the customer microservice and ran into some issues getting the customer api container to stay running. We were having issues with foreign key relations and left it as a problem to solve on Monday.

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