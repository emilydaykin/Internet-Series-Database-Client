import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSeries, filterSeriesByGenre } from '../api/series';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState(null);
  const [uniqueGenres, setUniqueGenres] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const allSeries = await getAllSeries();
      console.log('all series:', allSeries);
      setSeries(allSeries);
      const allGenres = allSeries.map((series) => series.genre);
      console.log('all genres:', allGenres.flat());
      setUniqueGenres([...new Set(allGenres.flat())]);
    };
    getData();

    // const filterSeries = async () => {
    //   const filteredSeries = await filterSeriesByGenre('crime');
    // };
    // filterSeries();
  }, []);

  console.log('uniqueGenres:', uniqueGenres);

  return (
    <section className='home'>
      <h1 className='u-margin-bottom-small'>
        <span>ISDb</span> Internet Series Database
      </h1>
      <div className='home__content'>
        <div className='home__controls'>
          <input
            type='text'
            className='home__search-bar'
            placeholder={'Search title, actor, plot, year, rating, genre'}
          />
          <p className='home__controls-heading'>Filter By Genre:</p>
          {uniqueGenres.length !== 0 ? (
            <div className='home__filters'>
              {uniqueGenres.map((genre) => (
                <div key={genre} className='home__filter'>
                  {genre}
                </div>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
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
      </div>
    </section>
  );
};

export default Home;
