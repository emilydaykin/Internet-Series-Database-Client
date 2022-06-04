import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../lib/auth';
import ElasticCarousel from './ElasticCarousel';
import { getAllSeries } from '../api/series';

const UserProfile = () => {
  const userObject = getLoggedInUser();

  const [allSeries, setAllSeries] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  // TEMP
  useEffect(() => {
    const getData = async () => {
      const allSeries = await getAllSeries();
      setAllSeries(allSeries.data);
      setFavourites(allSeries.data.slice(10, 30));
    };
    getData();
  }, []);

  console.log('favourites', favourites);

  const calculateFavouriteGenre = () => {
    if (favourites) {
      const allLikedGenres = favourites.map((series) => series.genre).flat();
      // console.log('allLikedGenres', allLikedGenres);
      const genreCount = {};
      allLikedGenres.forEach(
        (genre) => (genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1)
      );
      // console.log('genreCount', genreCount);
      const maxGenreOccurance = Math.max(...Object.values(genreCount));
      const favouriteGenre = Object.keys(genreCount).find(
        (key) => genreCount[key] === maxGenreOccurance
      );
      // console.log('favouriteGenre', favouriteGenre, `(${maxGenreOccurance})`);
      return favouriteGenre;
    }
  };

  const getRecommendations = () => {
    if (allSeries && favourites) {
      // 'similaries' = modal genre in their 'liked' list
      console.log('fave genre:', calculateFavouriteGenre());
      const nonLikedSimilaries = allSeries.filter(
        (series) =>
          series.genre.includes(calculateFavouriteGenre()) &&
          !favourites.map((likedShow) => likedShow._id).includes(series._id)
      );
      console.log('nonLikedSimilaries', nonLikedSimilaries);
      // Shorten the recommendation list by picking 12 random similar series:
      const shuffledList = [...nonLikedSimilaries].sort(() => 0.5 - Math.random());
      return shuffledList.slice(0, 12); // will return all if length < 12.
    }
  };

  getRecommendations();

  return (
    <section className='user-profile'>
      <h1 className='user-profile__welcome'>Hello {userObject.userName}!</h1>
      <div className='user-profile__favourites'>
        <h2>Favourite Series {favourites ? `(${favourites.length})` : ''}</h2>
        <p className='user-profile__text u-margin-top-small'>
          The list of {favourites ? `${favourites.length}` : ''} series that you have 'liked'.
        </p>
        <ElasticCarousel seriesList={favourites} />
      </div>
      <div className='user-profile__recommendations'>
        <h2>Other Series You May Like</h2>
        <p className='user-profile__text u-margin-top-small'>Based on your 'liked' series.</p>
        <ElasticCarousel seriesList={getRecommendations()} />
      </div>
    </section>
  );
};

export default UserProfile;
