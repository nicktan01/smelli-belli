## May 27, 2022

Today, we worked on:

- Splitting up our project into microservices (with Group)

We figured out our different microservices for our project - accounts, inventory, customer, employee.

- Figuring out questions for the quizzes (with Jaiden, Jordan, Nicholas)

We worked on figuring out some potential questions for our quizzes and which answers could go for which scents.

- Docker-compose.yml file (with Jaiden, Jordan)

We drafted up our initial Docker compose file, but we're still feeling unsure about whether we want to use Django, FastAPI, or a mix of both. Will need to consult with the full team again about our decision.

We wanted to start our Django project files but were unsure of how to do so.

## May 31, 2022

Today, we worked on:

- Creating the Django Inventory project and REST files and Dockerizing it (with Group)

Elliott showed us how to start our Django inventory project using a local virtual environment before Dockerizing the project. There was an issue with Dockerizing, but Elliott and Jaiden were able to work it out with Curtis while Jordan, Nicholas, and I started adding features to the Issues Board.

- Adding backend features onto the GitLab Issues Board (with Jordan, Nicholas)

Jordan, Nicholas and I were able to add issues to create the backend components of our microservices. Each issue is to create the models, views, and paths of the different microservices. We hope to get most of the backend set up by the end of this week!
We also are planning to implement the Customer microservice using FastAPI and the Inventory microservice using Django.

## June 1, 2022

Today, we worked on:

- Scrapping our thought of using FastAPI with the Customer Microservice (with Jordan, Jaiden)

Jordan and I started off project time with making our Customer microservice using FastAPI. We had some issues trying to Dockerize it, but with help from Mitch were able to figure it out. Once we were able to get our Docker containers up and running, Jaiden joined us in trying to write the APIs. We had decided to work on our wishlist API together first since we all feel unfamliar with writing FastAPI but were having a hard time with figuring out how to go about writing the it since with our wishlist, we would need to poll data from our inventory microservice for products but also have access to our accounts microservice. We put in another help ticket where Mitch tried to explain to us an approach we could take but we felt it would be a rough path since we haven't had any experience writing table data that we could use with our API. After some thought, we decided to scrap using FastAPI and stick with writing the backend to our microservices with Django.

# June 2, 2022

Today, we worked on:

- Customer Microservice (with Jordan, Nicholas)

We decided to start working on the Quiz stuff since Curtis prioritized it as something we should figure out first and did some research on how we could design our quiz models. We found a Youtube video to start off with that gave us some ideas to try and wrote our quiz models based off of that. After some struggles with remembering to do little things and add a comma to get the container to run, we were able to get the containers running and were able to login to the admin page. It still needs some tinkering as the admin panel was only showing the question and answer model but not the quiz model.. Something to work on and figure out for tomorrow.

June 3, 2022

Today, we worked on:

- Customer Microservice (with Group)

Jordan, Nicholas, and I did more work today on the quiz models and made a couple changes to the original models we had written yesterday to incorporate scents into the answers and we added the cart and wishlist models as well. We realized we didn't make the admin for the quiz model which is why it wasn't showing up in the admin panel yesterday so after we added that, we were able to see it. We also wrote the pollers for scents and products. Elliot and I wrote the encoders for the views. Then we ran into some issues with running our containers after we made some tweaks to get the scent to be a foreign key and poll from the Scent property in the inventory. It's been a long week, but I'm still proud of the progress we've made!
