# Place Finder

*Place Finder* is an application that allows users to type in keywords and find places (namely restaurants) close to them. It uses Google Places to populate the locale, Google Natural Language API to get a general sense of what people feel for the actual location, and MongoDB to store sentiments from users. 

## Requirements

This project was developed using the following:

- Node (v8.16.0)
- MongoDB (v4.0.x)
- NPM (v6.4.1)

It is advised that you have these installed to run the application locally. 

## How the Application Works

There are essentially two applications that run, a backend Express.js application that acts as an API, and a Frontend application powered by Vue.js. Moreover, the API uses MongoDB as a primary data store.

## Getting Started

Below are steps to start seeing the application in action.

### Starting `mongod`

Before the application can truly be started, you must make sure that the Mongo daemon (`mongod`) is running in the background. 

For Linux/Ubuntu-based systems, this can be done by running: `sudo service mongod start`. 

macOS users should follow the steps outlined [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

### Starting the backend application

In a terminal application of your choice, make your way to the `/server` directory of this repository. Be sure to install all dependencies using `npm install`. After this is done, you may run `npm start` and the server should start rather quickly. You should see a message indicating that connecting to the database was successful, and you can now move on to starting the frontend.


### Starting the frontend application

After starting the backend, go to the root directory of this repository, then go into the `/client` directory. Like before, `npm install` all required dependencies, and run `npm run dev` to start the application. You can test the application by going to `http://localhost:8080` in whatever browser you feel comfortable with. You'll be taken to the search page, where you can start searching and adding your favorite venues that you find. 

## Some assumptions to consider

While doing this task, there are some liberties that I took; some of these definitely influenced the path I took when designing the application. I list a couple here below to start any other discussion around the design of the application:

- The choice of displaying "Most Google users..." was an interpretation of the sentiment instructions. I read them as wanting an overall analysis of the reviews, not necessarily an analysis of each individual review. Accounting for this in the schema would not be a heavy lift, but is not how the application was designed. 

- Reviews, as I realized a bit later on while doing the project, were a bit ambiguously defined in terms of their desired function. I wanted to provide a simple interface, so I opted to omit them from the user interface, relying more on the color-coding to relay emotion and the sentiment analysis to demonstrate what users generally felt.

## Questions

If you have any further questions, please feel free to let me know!