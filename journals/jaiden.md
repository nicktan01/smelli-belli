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

## June 3, 2022
Today I worked on:

- fixing the docker compose for the employee's service
- updated some fields in the models and encoders in the employee's service and merged to main
- helped create the views for the customer service

I worked with Elliot in a live share that I got to host, so now I have some experience using VScode Live Share, and together, we fixed the docker compose file 
by adding the Employee service to `POSTGRES_MULTIPLE_DATABASES` and by discussing what data should actually be polled into the service for the product. 

After finishing up what we had planned for the employee service, I helped Jordan and Cindy with the Customer views.

## June 6, 2022
Today I worked on:

- fixing pollers and cleaning up the backend

I worked with Elliot in a live share to iron out some issues we were having with the pollers for both employee and customer services. One problem just kept leading to another but we eventually got them all sorted out after reviewing sections of code in basically every service.

Elliot and I reexperienced the pains of needing to remove volumes and recompose containers in order to get a clean database, and still be able to test that all our data was valid and able to be shared across services. Overall, I think we are pretty much done with the backend aside from maybe implementing some code Curtis showed us to verify that users are logged in or logged out.

## June 7, 2022
Today I worked on:

- the main page
- (started) the Accounts page

I mostly worked by myself today, our group spread out to work on various things to make sure we can make it within the time constraints. I did get some help from Jordan a couple of times when I was having a blocker and Cindy helped direct me to the things I needed to get done. I completed a carousel as well as the buttons that lead to specific quizzes. The links all work, and the Carousel displays the 'top body product' and the 'top home product' which has the barebones filters in place. I will need to add more code once we get our orders and orderfufillment working so I can actually choose the most popular products to display.

I took a look at the accounts pags, and they are set to be worked on tomorrow. I learned a lot more about the things you can do in bootstrap and just setting up my own css since I haven't successfully played around with it until now. Overall though, I think I am getting into the swing of things.

## June 8, 2022
Today I worked on:

- populating and refactoring the inventory microservice

Our entire group worked together to get a json we could use to populate data for products within our inventory service. I learned how to do that from Jordan, and we ran into some blockers and realized that our models needed some refactoring or just had some flaws. We updated the code through a live share cindy had and then troubleshooted individually thinking that one of us had a database issue when it was just poorly designed models. Luckily we now have data we can actively use for things like our products page now and soon, orders and to use for our carousel to display the most popular items. Tomorrow we plan on making quizzes and relating them to the products we populated the database with

## June 9, 2022
Today I worked on:

- The Account Page
- cart

I worked on the front end for the Account page and I think it is in a good barebone state where I can read the properties of a user. I tried adding a form to be able to edit details of a user but I am currently unsure of how that will work since changing any property of the user will change the token and I am unfamiliar with tokens and authentication. I also went through some of the other files in the project that relate to users and tried adding some logic that would let the link `my account` lead to a user's account when logged in or the `signup/login` page when the current user doesnt have an active token. 

I tried helping Nick with his implementation of the cart, and we made a bit of progress in terms of knowing the direction that we need to move in to get things working, but there are some nuances we will need help ironing out tomorrow.

I learned a bit more about jwt and authentication from rewatching curtis' private lecture for our group as well as watching some extra tutorials online. I am still a bit anxious to work on things requiring authentication but I definitely feel like im learning something important as I keep working.

## June 15, 2022
Today I worked on:

- Reloading the page

Currently, even after making some changes, the `my account` button doesnt work properly due to the main page or the nav not refreshing and registering that there is no longer 
an active token. I will look into this further tonight and hopefully have a fix by tomorrow's project time so I can debug any other issues we are currently experiencing.
It is especially strange to me because I pulled the logout component with the same imports from our original login/signup pages and while it does redirect to the main page
upon logging out, it doesnt register that there is not an active token.

## June 16, 2022
Today I worked on:

- Styling for the Main Page components

I havent really done too much html for this project so im struggling with getting the placement of the different elements on the screen, but am honestly in a pretty good spot with tying in the main things needed for the main page. Hopefully I will be done tomorrow or over this three day weekend with the placement and scaling for the mainpage. I learned about authentication a little bit more thanks to Curtis coming in to talk with us about it and seeing how everything connects.

## June 21, 2022
Today I worked on:

- Fixed some issues for deployment
- Finishing Front end for cart
- Updating Front end for main page

In the morning I worked with my entire group to sort out some issues regarding urls and deployment. We opted for enviornment variables to replace our current `localhost` urls in order to make sure everything would work when we deploy in the coming week. 

I also assisted Nicholas with figuring out why products wouldnt display within the cart, and I learned a little bit more about authentication after reviewing the steps that were taken within quizzes to get a current user using the token.

After working with the team, I went back to fixing some minor bugs within my own code and tring to update the main page so that elements within the page would scale better and allow for a better user experience.

## June 22, 2022
Today I worked on:

- Worked on the Cart

I worked with Nicholas to sort out some blockers he was having. We managed to get a lot done after talking some stuff out. The cart button now works and properly adds items to cart, and if the same product is added multiple times, it will instead increase the quantity of the item as opposed to showing multiple instances of the product. We also got pricing to show up and be calculated properly based on the amount of each item exists in cart. We made a few changes in the backend in order to keep track of the cartQuantity of each item. Overall I think the cart is pretty much done as of right now and we just need to add a `place order` button to allow for orders to be created.

I did have a revelation about just how free you are to do certain things when it comes to hiding components or showing them as we did for the increase/decrease buttons for the quantity of an item. 