import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSeries, filterSeriesByGenre } from '../api/series';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState(null);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showControls, setShowControls] = useState(true);
  const [filtersChosen, setFiltersChosen] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const allSeries = await getAllSeries();
      console.log('all series:', allSeries);
      setSeries(allSeries);
      const allGenres = allSeries.map((series) => series.genre);
      setUniqueGenres([...new Set(allGenres.flat())]);
    };
    getData();
  }, []);

  useEffect(() => {
    const filterSeries = async () => {
      const filteredSeries = await filterSeriesByGenre(filtersChosen);
      setSeries(filteredSeries);
    };
    filterSeries();
  }, [filtersChosen]);

  const handleExpand = () => {
    console.log('clicked');
    setShowControls(!showControls);
  };

  const selectFilter = (e) => {
    const genreChosen = e.target.innerText.toLowerCase();
    if (!filtersChosen.includes(genreChosen)) {
      setFiltersChosen([...filtersChosen, genreChosen]);
    } else {
      const genresLeft = filtersChosen.filter((genre) => genre !== genreChosen);
      setFiltersChosen(genresLeft);
    }
    e.target.classList.toggle('home__filter--selected');
  };

  console.log('filtersChosen:', filtersChosen);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength - 1)}...`;
    } else {
      return text;
    }
  };

  return (
    <section className='home'>
      <h1 className='u-margin-bottom-small'>
        <span>ISDb</span> Internet Series Database
      </h1>
      <div className='home__content'>
        <div className='home__controls-wrapper'>
          <div className='home__expand-controls' onClick={handleExpand}>
            {showControls ? (
              <p>
                <span>&laquo;</span>hide
              </p>
            ) : (
              <p>
                <span>&raquo;</span>search
              </p>
            )}
          </div>
          <div className={showControls ? 'home__controls' : 'u-collapse'}>
            <input
              type='text'
              className='home__search-bar'
              placeholder={'Search title, actor, plot, year, rating, genre'}
            />
            <p className='home__controls-heading'>Filter By Genre:</p>
            {uniqueGenres.length !== 0 ? (
              <div className='home__filters'>
                {uniqueGenres.map((genre) => (
                  <div
                    key={genre}
                    className='home__filter'
                    onClick={selectFilter}
                    value={genre.toLowerCase()}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className='home__catalogue'>
          {!series ? (
            <p className='home__empty-catalogue'>Loading series...</p>
          ) : series.length == 0 ? (
            <p className='home__empty-catalogue'>
              No series matching your combination of genres. Please try another search.
            </p>
          ) : (
            series.map((show) => (
              <div key={show._id} className='home__series-card'>
                <Link className='home__series-link' to={`/series/${show._id}`}>
                  <h2>{truncateText(show.name, 23)}</h2>
                  <img
                    className='home__series-poster'
                    src={show.image}
                    alt={`${show.name} series poster`}
                  />
                </Link>
                <p>{truncateText(show.description, 100)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
