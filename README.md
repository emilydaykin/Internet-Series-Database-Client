# Internet Series Database (ISDb)
ISDb is a full stack MERN (MongoDB, Express, React & Node) web and mobile application that allows users to browse TV series, leave comments and reviews and add them to their 'favourites' list. Seed data was web scraped from IMDb, and authenticated users can enjoy a simple recommender system that suggests similar series based on their 'favourites'.

**This repo contains code for the front end client only; code for the back end api lives [here](https://github.com/emilydaykin/Internet-Series-Database-API).**

# Tech Stack
- Front End: React.js SPA, Sass
- Back End: Node, MongoDB, Mongoose, Express, Python
- Data Collection: Web scraping with Python
- Authentication: JSON Web Token (JWT)
- Testing: 
  - Front end: Jest for mocks, React Testing Library
  - Back End: ¿mocha/chai/supertest???
- Other Packages & Tools: Postman, MongoDB Compass, Axios, Elastic Carousel
- Deployment: Netlify (FE), and Heroku & Mongo Atlas (BE)

# Application Walkthrough
## Web App
- screenshots
- screenshots
## Mobile App

# Installation:
- Live demo here
- Run and test locally:
  - Back End:
    1. Clone the [backend repo](https://github.com/emilydaykin/Internet-Series-Database-API)
    2. Run MongoDB locally
    3. `npm i` 
    4. `npm run start:server`
  - Front End: 
    1. Clone this repo
    2. `npm i`
    3. `npm run test` (XX test suits and XX tests)
    4. `npm run start:client`

# Features
- Display of all series (XX were pre-seeded via scraping IMDb)
- An expand-collapse search and filter tool for the series catalogue.
  - Searching by title, actor, plot, year, genre or rating
  - Filtering by genre
- Series-specific information (genre, actors, pilot year, average rating etc...)
- Commenting and rating a series once logged in, and editing/deleting your own comment???
- Recommender System (for logged in users) to suggest series similar to ones they've liked. 
- Authenticated users can:
  - View their profile page
  - Add a series to their profile's page via 'favouriting'
- Only admins can:
  - Add new series to the catalogue
  - Delete a series (with a safety confirmation)?????

# Architecture
- Secure routing
- how many model schemas
- unit & integration testing???  (XX test suits and XX tests)
  - Login (4 tests)
  - Register (11 tests)
  - Home (5 tests?)

# Data Collection
Python script to scrape IMDb

# Featured Code Snippets
- scraping (be)
- reommender system (fe)
- carousel and card flip CSS (fe)