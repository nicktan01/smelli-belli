## May 27, 2022

Today, I worked on:

1. With Cindy, Jordan, Nicholas, Elliot

   - We determined the different services we could have within our project
     as well as what each service would have in its bounded context

2. With Cindy, Jordan, Nicholas

   - We created questions that could possibly be used in order to determine
     the scent profile of a customer

3. With Cindy, Jordan
   - We worked on a starting docker-compose that could work with django, and
     discussed if we wanted to move to only using fast APIs

Today, I found some useful plugins for tracking git changes and commits,
thanks to Jordan. Git lens and Git graph are now a part of my arsenel


## May 31, 2022

Today I worked on:

- Creating the Django Inventory project and REST files and Dockerizing it (with Group)

Elliot helped guide and walkthrough the creation of a new Django project. We focused on the inventory service since we all agreed it is one of the biggest services, and all the other ones rely on it. We ran into some issues with starting it up, but managed to get it sorted with the help of Curtis.

Today I learned that some files can be marked as unexecutable (when in MAC or LINUX) while windows files are generally all labeled executable. This is the problem that Curtis helped us solve for our `create-multiple-databases.sh` causing our docker containers to not work properly. We had to run the command `chmod a+x create-multiple-databases.sh` in order to make it executable.


## June 1, 2022

Today I worked on:

- creation of `GET` and `POST` request views for the Products
- creation of `DELETE`, `GET`, `POST` request views for Scents

I worked with Elliot and Nicholas to (mostly) complete the inventory microservice, by taking turns writing code or just assisting.

I also tried out remote share with Jordan and Cindy, It was cool to see how we could interact within the same vs code at the same time and make changes directly, although I dont like how the writing seems to save based on the person who shares the link to remote share versus directly showing the individual that made the changes.

- started on the creation of models for Employee, pushed it up to issue-03 branch

## June 2, 2022
Today I worked on:

- creation of models for the Employee Microservice
- creation of `GET` and `POST` request views for Orders and ProductVOs
- creation of `DELETE`, `GET`, `POST` request views for Orders and ProductVOs

My wifi went down in the morning, so I mostly worked alone on the employee microservice to get most of the barebones stuff done. I created the majority of the models, views, encoders, urls, but im sure my group will have some things to change or add to the microservice so it works seamlessly with the other microservices.

Today I learned that `.sh` and `.db` files should be using LF instead of CRLF, and this can be changed by adding a `.gitattributes` file.

Tomorrow I need to fix another issue with the employee's service having an error regarding the password authentication.