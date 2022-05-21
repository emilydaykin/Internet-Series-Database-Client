import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../lib/auth';
import ElasticCarousel from './ElasticCarousel';
import { getAllSeries } from '../api/series';

const UserProfile = () => {
  const userObject = getLoggedInUser();
  console.log('userObject', userObject);
  const [favourites, setFavourites] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const allSeries = await getAllSeries();
      setFavourites(allSeries.slice(20, 30));
    };
    getData();
  }, []);

  console.log('favourites', favourites);

  const calculateFavouriteGenre = () => {
    if (favourites) {
      const allLikedGenres = favourites.map((series) => series.genre).flat();
      console.log('allLikedGenres', allLikedGenres);
      const genreCount = {};
      allLikedGenres.forEach(
        (genre) => (genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1)
      );
      console.log('genreCount', genreCount);
      const maxGenreOccurance = Math.max(...Object.values(genreCount));
      const favouriteGenre = Object.keys(genreCount).find(
        (key) => genreCount[key] === maxGenreOccurance
      );
      console.log('favouriteGenre', favouriteGenre, `(${maxGenreOccurance})`);
    }
  };

  calculateFavouriteGenre();

  return (
    <section className='user-profile'>
      <h1 className='user-profile__welcome'>Hello {userObject.userName}!</h1>
      <div className='user-profile__favourites'>
        <h2>Favourite Series {favourites ? `(${favourites.length})` : ''}</h2>
        <p className='u-margin-top-small'>The list of series that you've 'liked'.</p>
        <ElasticCarousel faves={favourites} />
      </div>
      <div className='user-profile__favourites'>
        <h2>Recommended Series For You</h2>
      </div>
    </section>
  );
};

export default UserProfile;
