import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSeries } from '../api/series';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const allSeries = await getAllSeries();
      setSeries(allSeries);
    };
    getData();
  }, []);

  console.log('all series:', series);

  return (
    <section className='home'>
      <h1>
        <span>ISDb</span> Internet Series Database
      </h1>
      {series ? (
        <div className='home__catalogue'>
          {series.map((show) => (
            <div key={show._id} className='home__series-card'>
              <Link className='home__series-link' to={`/series/${show._id}`}>
                <h2>{show.name}</h2>
                <img
                  className='home__series-poster'
                  src={show.image}
                  alt={`${show.name} series poster`}
                />
              </Link>
              <p>{show.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading series...</p>
      )}
    </section>
  );
};

export default Home;
