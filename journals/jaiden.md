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