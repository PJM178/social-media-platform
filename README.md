# Social Media Platform
The aim of this web app is to mimic something like Twitter. Users can register an account and post "blogs" on the site. Users can follow the users and like the blogs and post comments on them. The complete featureset is not set in stone as the aim of the project is to learn more about TypeScript and GraphQL as well as PostgreSQL implementation. Using GraphQL subscriptions could be interesting in implementing live chat between users or maybe even chat rooms.

Currently features:

* Displaying all posts on the homepage
* Adding new posts, updating the homepage view
* Liking posts, displaying liked posts on profile page
* Session based user authentication
* Adding comments to posts

Made with TypeScript and React in the frontend and TypeScript and GraphQL in the backend. PostgreSQL is used as a database.


## Installation and Running

Download the zip file, unzip the project, navigate to frontend and backend folders in VSC, for example, and run npm install. To run the frontend and backend run npm start and npm run dev, respectively.

You need to put couple environment variableds into .env in the backend folder:

DATABASE_URL - PostgreSQL url, for example ElephantSQL
PORT - 4000 as a default
SECRET - a string to sign the token for authentication
CORS - react app url