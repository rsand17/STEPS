# STEPS project
Hi STEPS team! I'm excited to have the opportunity to interview with you and show you guys some of my work. I'll quickly outline some things here in the README to help you while testing my work.
## Setup
You will need to do a few things before being able to start the server:
-The first is have [node.js](https://nodejs.org/en/download/) and [npm yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) on whatever machine you're using.
-Next, after cloning the repository, run `yarn add express mongoose` in the root directory
-Finally, inside of server.js, replace passowrd on line 24 with the password provided in my email
## Usage
To start the server, simply run `node server.js` in the root directory. When sending requests, the url will be `http://localhost:3000/` followed by the route you wish to hit specified in the design doc.

post structure:
'{
    "user": "Ryan",
    "title": "Post Title",
    "body": "Post body"
}'

I used dates to denote a start and limit for chunks of posts to retreive. These are the params to be passed for GET posts:
-startDate (YYYY-MM-DD)
-endDate (YYYY-MM-DD)

The other three routes are called without params.
## Final Note
If I've missed anything, you run into problems, or you have any questions at all, feel free to email me rsand3624@gmail.com. Thanks for your time and consideration :)
