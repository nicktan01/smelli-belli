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

## June 6, 2022

---

Today we accomplished a lot! I started the day trolling around Inventory's backend. I removed the Scent model class because we decided as a team that it didn't make sense and wasn't helping us accomplish what we wanted to accomplish with scents. We added 4 scent properties to the product model instead, and made 3 of them optional, forcing at least one scent to be associated with each project. This may need to change down the line if Smelli Belli ever gets in the business of selling ANYTHING that doesn't have a scent, like, maybe skincare or beauty tools or accessories? Who knows! We cleaned up all references to the Scent model from the Inventory service then.

After the Inventory backend was back to looking like we wanted it, I paired up with Jaiden to work on our Employee and Customer pollers. While exploring the code in those two pollers and debugging the issues we ran into getting those to work and populate our Value Objects with information from the other services' Entity objects, we went about cleaning up a lot of the backend code that we looked at and found errors while debugging our poller code. We changed quite about while live share coding that pair coding session.

We eventually got the poller in the employee section working, correctly grabbing the relevant infromation from Products and populating ProductVOs for the Employee side of the web application. The employee poller also grabs User information from the Accounts microservice and attaches it to a UserVO so the Employees can create and view order fulfillment forms with the information from a customer's order.

We also got the Customer microservice's poller running, which, similar to the Employee poller is grabbing infromation from Products out of the Inventory microservice and attaching it to a ProductVO in the Customer microservice that will, hopefully, down the line allow customers to add items to their cart. We are still busy fleshing out the cart and checkout process, but we will get there when we get there! Overall, Jaiden and I were very happy to test the pollers and see both of them working only a few minutes before Curtis was scheduled to join our breakout room on Zoom and walk us through the authentication that he worked on for our app!

Closing the day on so many successive successes is quite a nice feeling, and to chase those successes and end the day on a Curtis live demonstration that clarifies a few blockers we foresaw regarding authentication within our app is simply _submlime_. Thanks, Curtis. It really means a lot to me and all of the other team members and cohort students that you take such an active involvement in our learning and project building experiences. Your generosity will not be forgotten!

## June 7, 2022

---

Today was a rough day. I paired with Nicholas at the beginning of the day on the home and body scent finder quiz issues, and very quickly into our work he unfortunately had to leave for a family emergency. I spent most of the day planning out how I thought the quizzes could work with pen and paper, and spent a large portion of that time reading documentation and other resources online to try and give me ideas. I am still tinkering with the code, but I have a good mental model of the steps I will need to take to get the quizzes to work as we want them to. Now, it's just a matter of achieving each of those steps one at a time until the quizzes are complete!

I saw that the rest of the team has been putting in absolutely amazing work on a lot of the other pages on our front end, and it fills me with joy. Everything is coming together, but these last steps of the MVP are quite the doozy!

## June 8, 2022

---

Today I continued thinking about and working on the quizzes to find our users' scent profiles. We also spent a while as a team writing up a decently sized products.json file to populate our development database whenever we need to. Before, it was getting very annoying creating instances of our data models every time we needed to bring our volume down for some reason. Looking forward to getting these quizzes finished...

## June 9, 2022

---

Got a lot done today!

- Refactored Body and Home scent profile quizzes into class components
- Wrote endpoints in our backend for the the scent profile quizzes, in order to store a user's scent profile quiz results
- Got a _looooot_ done on the body scent profile quiz front end side
- Stopped working on the home and body quizzes in tandem because the code is more or less copy and pastable from body into home once I'm done, just changing the names of values, IDs, and some slightly different wording

The front end portion of the quizzes is proving to be quite a hurdle, but it has been an incredibly enjoyable challenge. Using state and binding this to certain event handlers in order to save which answer a user has clicked on the quiz is really cool and it felt really exciting to see that working the way I intended it. Then, I worked on breaking the quiz into multiple pages, at least two for now, so that we can prompt the user with a sign up screen in order to save their quiz results if no authentication is detected. If authentication is detected, or once a user has signed up or refused to sign up, then I'd like that page to present the user with the results of their quiz, make a POST request to our backend endpoints to save those results if the conditions are met, and present the user with a filtered list of the products based on a query that matches products to the values of the answers from their quizzes! I left off last night having figured out different ways I can render multiple "pages" on a single React component, excited to spend today (June 10, when I am writing this entry) chugging along on figuring out the authentication portion and filtering the products list!! I figured out a funky way to make a POST request to our endpoints and I'm really excited about that.

## June 10, 2022

---

This day was a huge win for me. I was able to get the quizzes to successfully start offering a filtered products table. I opted for a table for speed and was able to get it done right in time before the start of mandatory fun time!!

## June 13, 2022

---

Separated each question into its own page, added a lot of explanatory comments in the code, brought the home products quiz up to speed with the body quiz so far. Just finishing touches on the quiz and adding authentication to it, so users can access their quiz results.

## June 15, 2022

---

I was incredibly tired this week with interviewing for and filling out all the onboarding paperwork for the SEIR position. Super excited for that! But it definitely slowed down work a lot, combined with the horrible 10-month sleep regression my son slipped into THIS VERY SAME WEEK. Sigh... This day I was able to work a lot on the bootstrap properties used in the quizzes to really hone in the formatting and make sure everything looked nice and clean. It wasn't a huge day, but it was important work.

## June 16, 2022

---

On this day I got navigation buttons working within the quizzes so users can toggle back and forth between questions they've already answered in case they want to review a question and perhaps change their answer to it. I also got detail page links to each product recommended to the user working. Nice!

## June 17, 2022

---

Worked with Curtis on trying to grab the user's information out of the token and save it to the quiz data models, but it was a pretty big blocker and I wasn't able to finish the work before the end of the day. I did a lot of work that got me to the point I needed to be to finish things up on Monday!

## June 20, 2022

---

Well, I realize that my journal entries here are pretty sparse, but I'd like to take a moment to paint my Dear Grader a picture:

You're coming up on the end of the biggest 19-week adventure you've willingly gone on in your life. You've poured blood sweat and tears into the personal project that is coming up on the finish line. Career services wants you to get some things done, and suddenly the work you do with them has a lot more bearing as the job search lies looming straight ahead. On top of that, you're super excited about the SEIR opportunity and have made landing that opportunity the new highest priority on the list! After going through the whole process of applying, interviewing, and then on boarding, the workload in your week at the end is much, much heavier. And, being at the end of 19 weeks, you're tired, Dear Grader. Oh, so tired. The results you see as you make each commit, sleep tugging at your eyelids, is enpugh to make you consider the day, your troubles, your successes, and your journey through each of them. So, with that in mind, I'd ask you to please keep that in mind when looking at the gap in my journal entries here. You can see the commits were there, and you can see how thoroughly I've documented my journal entries any other given week or time!

That being said, I think I **finally** finished up the quiz components, more or less, today. I was finally able to get the user's id saved to the User prop on the Home and Body Quiz data models by checking the authorization token. I also am pretty proud of the work I did on the quizzes to check for an authentication token, offer the user a choice of signing up to save their profile results or taking the quiz anyway, and then offering the user a "Save my scent profile!" button if an auth token is detected at the final screen of the quiz. All in all, choosing to write the quizzes as class components simply because that was what I was used to and what we spent a lot of time doing in class was an immense mistake and not one I would like to make again. I wish that class components had more support, but the fact is they do not and because of that lack of support they are never going to be functional or even serviceable to a project. Never use class components. Authentication is also pretty nasty to work with, and I did not have a good time with that at all.

## June 21, 2022

---

Today I spent some time trying to help Nicholas out with the cart. That was really difficult because we are trying to figure out how to authenticate the user's token in the fetch request's headers whenever we make requests to the cart endpoint. That was pretty tough work, and we got a clue from an outside source to check out "stale while refresh." Who knows if that will get us to where we need to be.

While helping Nicholas with that, I also spent the day working on the component that shows a user their saved home and body scent profiles. We want users to be able to save their results, so that they can pull them up again later whenever they want and see their results, as well as hopefully get a link to a filtered products page so they can continue browsing at the recommended products. At the end of the night I was able to finally figure out the GET request for only showing the relevant scent profiles for the currently-logged in user and opted to render the results as an ugly table for now. I'm hoping to change the table to cards using Bootstrap, or at least something more aesthetic than the ugly tables.

I also updated some of our data model documentation as that had really grown out of date as the project has gone on. Finally, I reworked the nav bar a little bit so that logged out users do not see all the links to user-specific parts of the application, like the saved scent profile page. They can still access these pages using the url, which is frustrating, but we'll get there. I think??

## June 22, 2022

---

AHHHHHHHHHHH! We're getting so close!!! Today was stressful, for so many reasons. It's sad to be coming to the end of our class. It's sad to be coming to the end of the project. There will very soon be a day in my life where I likely never open this project again -- yet it's been the source of so many positive and negative emotions over the past 3ish weeks! I'm simultaneously proud as hell at the work my team has produced in the timespan we have, and disappointed in the features I didn't get to see through. I'm anxious about deployment and the presentation. I'm worried about delivering our MVP. It's been a time!

Today I refactored the scent profiles page to render the saved profiles as cards with the quiz results displayed in each card, rather than a boring-ass table. I was really hoping to get around to making each card a clickable link that takes the user to a filtered products page, so they can see the same products that were filtered to them at the end of the quiz when they initially took it, but I guess we just won't get around to that. I honestly think the features that we do have in the project are a decent proof of concept if we were to ever meet with some investors...

I helped Jaiden and Nicholas a bit where I was able to in the Cart, but mostly just sat back and watched in awe as Curtis dipped into an application I can't imagine he's really all that familiar with and still guide the team around in debugging their code with ease.

I also fixed some slight errors with our products.json file we've been using to automatically populate our products database whenever we need to, like when we need to rebuild the database for whatever reason. Long story short, the way we had formatted those hand-written instances ended up causing some problems when we loaded that data that we just never really noticed, and greatly affected the number of products that people were seeing on our site. Finding that issue and fixing it was a wonderful feeling, because suddenly our products page and quiz were returning a much more satisfactory number of suggestions/options to the user! Suddenly, it seemed like a much more real application.

I also fixed the navbar toggler button when the window is resized down. React doesn't have any native way of changing the aria properties for expanded or collapsed on a normal Bootstrap navbar toggler button, so I realized that I needed to use state and call an onClick function on the toggler to get it behaving as we intended it to. The resulting nav bar is certainly pretty ugly, but, hey, functionality first!

## June 23, 2022

---

Today was hard. We're so close to the end, and it really just seems like everyone is disappointed and done. I don't think any of us got all the things done that we wanted to do in the project, and today was one of the bigger steps towards accepting that before tomorrow's deadline. I spent the day trying to put out a lot of fires as they popped up, since I had completed most of the functional components that I had wanted finished before deployment. There were a ton of issues with the cart and checkout that we all know about and we were all present for. I wish that I had been able to be more involved with those components, but I simply have not had the time with my own issues to complete on top of the craziness of real life and the whole SEIR application/onboarding process. Poor Nick took on those issues all by himself in the midst of some personal shit. I think that we could have done a lot of things differently.

One thing that has really piqued my interest as we come to the close of this journey and I start to reflect on this project has been a growing interest in how ecommerce platforms actually work. My wife has worked in tech start ups for her whole career, and has always had a lot of things to say about the platforms that she has worked with. A lot of them... not so positive, let's say. The suggestion box runneth over. I'm not at all trying to say that we, a group of amateur devs with 0 experience, could build a better project or even have better ideas than the massive, investment-laden teams behind popular shopping platforms; however, seeing firsthand the inner workings of a shopping platform -- however finished -- has definitely revealed a potential interest I never knew I had. Hmmmmmm...
