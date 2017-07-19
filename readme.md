#Description

Small project made to test functionality of both - GraphQL and Apollo. While searching for tutorials I found that there is very little made with both, server and client side of the code. That's why I decided to make this project public. Additionally to that, I hope that some people will comment on 'how to use it better'.

So it is a small todo app. It is mostly focuses on using actual Apollo and GraphQL rather than being actual useful app. With time I may add some additional functionalities just to test additional features of libraries.

#How to run
* First of you need a MongoDB. If you have it and you have all details needed for connection, create *config.js* file in server folder and copy content of *config.js.default* to it. Then type in your connection data.
* If you are not planning on develop, fastest way is to run `npm run pas` or `yarn pas` depending on what you are using. Pas stands for 'Prepare and start'. I may need to find better acronym.

#Whats inside?
* Basic queries
* Paginated query with cursor
* Basic mutation
* Optimistic updates
* Store updates (done with reducer - I prefer that approach, rather than normal query update for two reasons. 1. Seems to be less complicated 2. After working a lot with Redux I started seeing why it is better to spread out your store updates to the parts which are really working with that data. So in this case, if you add a task, reducer in TasksList will update the store.)

#Planning to do
* Separate some code - in Apollo components feels very code heavy (because of queries, but also updates). I have a feeling that it might be worth having folder for some queried components and there have its parts. There might be a better design though.
* Secure *end of list* - currently pagination will break if we reach end of list and click button again.

#Unanswered (yet?) questions
* How to handle optimistic update of deletion? Should we be doing optimistic update of deletion at all?

If you have opinion on design choice or you simply know that something here should be done differently - feel free to write an issue. I posted this here for mine and community benefit.