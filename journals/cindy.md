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

# June 3, 2022

Today, we worked on:

- Customer Microservice (with Group)

Jordan, Nicholas, and I did more work today on the quiz models and made a couple changes to the original models we had written yesterday to incorporate scents into the answers and we added the cart and wishlist models as well. We realized we didn't make the admin for the quiz model which is why it wasn't showing up in the admin panel yesterday so after we added that, we were able to see it. We also wrote the pollers for scents and products. Elliot and I wrote the encoders for the views. Then we ran into some issues with running our containers after we made some tweaks to get the scent to be a foreign key and poll from the Scent property in the inventory. It's been a long week, but I'm still proud of the progress we've made!

# June 6, 2022

Today, I worked on:

- About Page and GoogleMaps API integration

Initially Jordan, Nicholas, and I were working to figure out how to integrate the GoogleMaps API and we were able to get a map to show up on the page but weren't able to get multiple markers on the map. I continued to work on this on my own after class and was able to find the @react-google-maps/api package and followed the documentation to get the map working with markers! I also added info windows to appear that list what ingredients were sourced at the marker when clicking on the markers. To finish the about page, I added some information about Smelli Belli and a few FAQ questions.

- Nav Bar and skeleton Home Page

I wanted to get the Nav Bar up so that we could have a semi complete looking React page when working with the About Page/map integration, so I quickly slapped in some code and got the nav drop downs up along with Bootstrap account and cart icons for accounts links and the cart. Using Bootstrap I was also able to add a counter for the cart. The number is currently hardcoded, but will figure out the proper cart items number later once we have more of the React pages made. I made a skeleton home page just to test out the nav bar before hopping into working on the map integration/about page.

# June 7, 2022

Today, I worked on:

- Finishing the proper marker points on the map in the About Page

Yesterday I had just put in random dummy data markers, but today I searched up what ingredients make up the different scents we will be using on our quiz/products and also looked up some locations on where those ingredients are farmed/made. While the data is still "fake", it's a bit more believable and done with some research!

- Implementing the Footer

While creating the footer wasn't too complicated since I used a Bootstrap template, I also added social media/contact icons that are fully functioning! There's an email, Instagram, Facebook, Facebook Messenger, and bonus Easter egg of our LinkedIn profiles! I made a Smelli Belli account for all contact/social medias so that they would be working links. The email icon directs the user to be able to send an email to us, Instagram leads to our IG page, Facebook also leads to our FB page, and the FB Messenger allows users to message us (HA! A work around to not creating our own websocket!)! Was pretty exciting and fun to be able to get all these things working.

# June 8, 2022

Today, I worked on:

- Adding products to inventory (with Group)

Today we decided that we should figure out how to create saved data for the products so that we could populate our website. Jordan found some documentation on how we could write a .json file inside our Inventory microservce containing the products and load them into the container using 'python manage.py loaddata products.json'. We each contributed a 16 products per person after establishing different names for scent combinations. We came up with a total of 20 differnt scent combinations/names! Intially when we tried to loaddata, we kept getting an error with our size saying that it needed to be an integer and we later found out it was because of how we structered the models. Another issue we had was that we had manually labeled each ID for the products instead of using PK. To fix the size issue, we decided to change our model to a CharField instead of having it be a Choices field. Then we had an issue with the product_type field cause we were going over the max length, but thankfully that was an easy fix. After those issues were out of the way, the products were able to be loaded into our container and we were able to see them come up in Insomnia and later on the website after Jordan finished the products pages!

- Fixing up the login page

Later after class, I decided to take on working in the Authentication branch since Jaiden wanted to test the Account pages. I decided to separate out the code Curtis wrote from inside the App.js file into it's own file. Intially I didn't have much of a clue of what was going on with the code - I saw login, signup, and product stuff in there but I did recognize what looked like entry fields inside of the return function and so I decided to start there and use Bootstrap to make it look more like a form/nice login page. After I was able to get the styling where I wanted it, I decided to try commenting out the products stuff to see if it would break/change anything and when I noticed it was still fine, I decided to separate all of that stuff out into another page in case others would want to use that for maybe account or cart stuff later. Then I wanted to separate out the login and signup features since they were combined at the moment and was able to get those separated. I added a bit more functionality to the two forms by having the login page have an option to sign up if they were new to Smelli Belli and then changing/styling the error message that comes up when a field is incorrect. I also changed the logout redirection to go to the home page instead of back to the login or signup pages.

# June 9, 2022

Today I worked on:

- Improvements to our website

This morning, Jordan sent us a design she came up with for our logo and it was really amazing! I loved it! Now that I had the logo, I wanted to spruce up our website and make it look more official and nice! So I spent quite a bit of time looking for product photos to fill our product image cards and input them into all of our products. Later Jordan mentioned that there could be an issue with using images that weren't free source so I had to find free source images through Pexels but this time I decided I wanted to have more variety to our product photos and I also wanted to brand some of the products with Smelli Belli and so I took the extra time to do that as well. Unnecessary? Totally. Worth it? YES. I also added our new logo to the nav and footers! And I wanted to make a banner for the About page as well! It's looking really put together now and I love all of the styling updates!

# June 15, 2022

Today I worked on:

- Fixing Auth so that the token would be global

As Jaiden was working on our accounts pages, he noticed an issue while logging a user out - the account page was not redirecting to the login page. Upon further inspection, we discovered that the token's state was only local to the page and wasn't being updated globally which was why the navigation wasn't reflecting that a user was logged out. With some help, I learned a little bit on how to use React's context API (createContext, useContext and Provider) to get the token to sync globally.

- Hiding Employee Nav from non-staff users

Got started on some Employee page work and hid the employee nav from users who are not staff. Will plan to work on the inventory page tomorrow.

# June 16, 2022

Today I worked on:

- Employee Inventory Page

Today I was able to finish writing the Inventory page for the employees. I started by writing the whole inventory page with a class based function and then later refactored it using hooks as practice. On the Inventory page I was able to list all products in a table, put in a search bar to search for items by name or keywords, and also adjust the quantity of a product right inside the table.

# June 17, 2022

Today I worked on:

- Employee Add New Product Form

To get more practice with hooks, I decided to try writing the form using hooks and it was successful! I also manually added drop down options inside the form but will have to revisit them later and fix a minor issue. I believe the dropdown inputs are saving via their value attribute and not the intended input that I wanted. It's basically just a matter of having the values be capitalized though rather than lowercase, so I will tinker with that and see what's going on another day. I tried adding a test product using the form and was able to search for said test product in the inventory page as well as see it appear in the products page!
