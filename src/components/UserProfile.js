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
      setFavourites(allSeries.slice(0, 10));
    };
    getData();
  }, []);

  console.log('favourites', favourites);

  return (
    <section className='user-profile'>
      <h1 className='user-profile__welcome'>Hello {userObject.userName}!</h1>
      <div className='user-profile__favourites'>
        <h2>Favourite Series {favourites ? `(${favourites.length})` : ''}</h2>
        <p className='u-margin-top-small'>
          The list of series that you've 'liked' will appear here.
        </p>
        <ElasticCarousel faves={favourites} />
      </div>
      <div className='user-profile__favourites'>
        <h2>Recommended Series For You</h2>
      </div>
    </section>
  );
};

export default UserProfile;
