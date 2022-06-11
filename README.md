# Internet Series Database (ISDb)
ISDb is a tested, full stack MERN (MongoDB, Express, React & Node) web and mobile application that allows users to browse and filter TV series, add them to their 'favourites' list, leave reviews and ratings, and get recommendations based on their favourites; admins can further add new series to the catalogue. Seed data for the series was generated dynamically by web scraping IMDb.

**This repo contains code for the front end client only; code for the back end api lives [here](https://github.com/emilydaykin/Internet-Series-Database-API).**

## Table of Contents  
1. [Application Walkthrough](#application-walkthrough)  
2. [Installation](#installation)  
3. [Tech Stack](#tech-stack)  
4. [Features](#features)  
5. [Architecture](#architecture) 
6. [Data Collection &#38; Curation](#data-collection--curation) 
7. [Featured Code Snippets](#featured-code-snippets) ([Front End](#front-end) & [Back End](#back-end))
8. [Challenges & Wins](#challenges--wins) 
9. [Key Learnings](#key-leanrings) 

# Application Walkthrough
## Web App
- screenshots
- screenshots
## Mobile App

# Installation:
- Check out the [deployed version](#)!
- Or run and test locally:
  - Back End: Clone the [backend repo](https://github.com/emilydaykin/Internet-Series-Database-API) &rarr; Run MongoDB locally &rarr; `npm i` &rarr; `npm run start:server`
  - Front End: Clone this repo &rarr; `npm i` &rarr; `npm run test` (XX test suits and XX tests) &rarr; `npm run start:client`

# Tech Stack
- Front End: React.js SPA, Sass (BEM)
- Back End: Node, MongoDB, Mongoose, Express, Python
- Data Collection: Web scraping with Python
- Authentication: JSON Web Token (JWT)
- Testing: 
  - Front end: Jest for mocks, React Testing Library
  - Back End: ¿mocha/chai/supertest???
- Other Packages & Tools: Postman, MongoDB Compass, Axios, Elastic Carousel
- Deployment: 
  - Front end: Netlify
  - Back end: Heroku & Mongo Atlas


# Features
- Display of all series (XX were pre-seeded via scraping IMDb)
- An expand-collapse search and filter tool for the series catalogue.
  - Searching by title, actor, plot, year, genre or rating
  - Filtering by genre
- Series-specific information (genre, actors, pilot year, average rating etc...)
- Commenting on and rating a series once logged in, and deleting your own comment
- Recommender System (for logged in users) to suggest series similar to ones they've liked. 
- Authenticated users can:
  - Add a series to their profile's page via 'favouriting' (double clicking on the series poster on the individual series page)
  - View their profile page, which displays carousels each for their favourites and resulting recommendations
- Admins have the same rights as non-admin users, but can also add new series to the catalogue

# Architecture
- Secure routing
- how many model schemas
- Unit & Integration testing (5 test suites and 31 tests)
  - Home (6 unit tests)
  - Navbar (1 unit test)
  - Login (4 unit tests)
  - Register (11 unit tests)
  - UserProfile (3 unit tests & 2 integration tests)
  - ElasticCarousel (4 unit tests)

# Data Collection & Curation
- Dynamically generated seed **series** data via a Python script that scrapes IMDb (see code snippet below).
- Manually generated seed **comments** via Mongoose once the User and Series models were seeded (see code snippet below).
  

# Featured Code Snippets
### Front End
- reommender system (fe)
- carousel and card flip CSS (fe)
- testing snippet

### Back End
- Scraping IMDb (be):

  ```
  # Full code: $db/data/scraping_imdb.py

  def extract_years(years):
    years_split = years.split('–')
    assert len(years_split) <= 2, '`Years` was not split correctly'
    assert len(years_split) >0, '`Years` was not split correctly'
    pilot_year = years_split[0]
    finale_year = 'ongoing' if len(years_split) == 1 else years_split[1]
    return pilot_year, finale_year

  for index, url in enumerate(URLs):
    try:
      print(f'{index+1}/{len(URLs)}: Scraping {url}...')
      page = requests.get(url)
      soup = BeautifulSoup(page.content, 'html.parser')
      
      # Separate class name in IMDb for super long titles:
      if url == 'https://www.imdb.com/title/tt13315324/?ref_=nv_sr_srsg_0':
          title = soup.find_all('h1', class_='sc-b73cd867-0 cAMrQp')[0].text
      else:
          title = soup.find_all('h1', class_='sc-b73cd867-0 eKrKux')[0].text
      years = soup.find_all('span', class_='sc-52284603-2 iTRONr')[0].text
      poster = soup.find('img', class_='ipc-image')['src']
      genres_elements = soup.find_all(
          'a', class_='sc-16ede01-3 bYNgQ ipc-chip ipc-chip--on-baseAlt')
      genres = [genre.text for genre in genres_elements]
      description = soup.find_all('span', class_='sc-16ede01-1 kgphFu')[0].text
      rating = soup.find_all('span', class_='sc-7ab21ed2-1 jGRxWM')[0].text
      top_3_actor_elements = soup.find_all('a', class_='sc-11eed019-1 jFeBIw')[:3]
      top_3_actors = [actor.text for actor in top_3_actor_elements]
      number_of_episodes = soup.find_all('span', class_='ipc-title__subtext')[0].text
      language = soup.find_all('a', class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link')[-7].text
      pilot_year, finale_year = extract_years(years)

    except Exception as err:
      print(f'Error "{err}" for the URL {url}')
  ```
- Creating comments data using the User and Series models (be):

  ```
  // Full code: $db/seed.js

  const user1 = await User.findOne({ username: 'sierra' });
  const lastDance = await Series.findOne({ name: /last dance/i });

  lastDance.comments.push(
    createComment(
      "Breath-taking. Can't believe they had all that terrific footage. For all the sports fans out there.",
      5,
      user1._id,
      user1.username
    )
  );
  
  await lastDance.save();
  ```
- add to user favourites controller (be)
- testing snippet

# Challenges & Wins:
This was the first time I'd ever implemented testing in javascript, so learning Jest and React Testing Library for front end testing, and mocha/chai/supertest??? for the back end was incredibly rewarding.

# Key Learnings:
- It's always easier to get the data needed in the front end by creating a new api endpoint in the back end, rather than appending it to a user's (JWT) token payload, which doesn't update as easily/in real time in session storage.
- When testing, any action (based on a user event or inital load) that causes the state to re-render must be wrapped in `act(...)`
- Testing components that are only accessible to authenticated users is done the same way as testing any other (public) component; the component is there in the codebase whether a user signs in or not, so when provided jest mock data, those components can be tested!