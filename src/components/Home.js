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
    <section>
      <h1>
        <span>LSDb</span> Localhost Series Database
      </h1>

      {series ? (
        <div className='catalogue'>
          {series.map((show) => (
            <div key={show._id} className='series-card'>
              <Link className='link' to={`/series/${show._id}`}>
                <h2>{show.name}</h2>
                {/* <figure> */}
                <img className='poster' src={show.image} alt={`${show.name} series poster`} />
                {/* </figure> */}
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
