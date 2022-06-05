import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSeries, filterSeriesByGenre } from '../api/series';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState(null);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showControls, setShowControls] = useState(true);
  const [filtersChosen, setFiltersChosen] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const allSeries = await getAllSeries();
        // console.log('all series:', allSeries);
        setSeries(allSeries.data);
        const allGenres = allSeries.data.map((series) => series.genre);
        setUniqueGenres([...new Set(allGenres.flat())]);
      } catch (err) {
        // console.log('useEffect getData error');
        // console.log('useEffect getData error', err);
        setIsError(true);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filterSeries = async () => {
      try {
        const filteredSeries = await filterSeriesByGenre(filtersChosen);
        setSeries(filteredSeries);
      } catch (err) {
        // console.log('useEffect filterSeries error');
        // console.log('useEffect filterSeries error', err);
        setIsError(true);
      }
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

  // console.log('filtersChosen:', filtersChosen);

  const clearFilter = (e) => {
    setFiltersChosen([]);
    console.log(e);
  };

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
          <div className={showControls ? 'home__controls' : 'u-collapse'}>
            <input
              type='text'
              className='home__search-bar'
              placeholder='Search title, actor, plot, year, rating, genre'
            />
            <p className='home__controls-heading'>
              {filtersChosen.length > 0 ? (
                <button className='home__clear-filter' onClick={clearFilter}>
                  Clear Filter
                </button>
              ) : (
                'Filter By Genre:'
              )}
            </p>
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
        </div>
        <div className='home__catalogue'>
          {isError && (
            <p className='home__empty-catalogue' role='error-message'>
              Oh no! Something went wrong fetching all series...
            </p>
          )}
          {!series ? (
            <p className='home__empty-catalogue' role='loading'>
              Loading series...
            </p>
          ) : series.length == 0 ? (
            <p className='home__empty-catalogue'>
              No series matching a genre combination of{' '}
              {filtersChosen
                .map((genre) => {
                  const genreTitleCase =
                    genre.slice(0, 1).toUpperCase() + genre.slice(1, genre.length);
                  if (genre === filtersChosen[filtersChosen.length - 1]) {
                    return ` and ${genreTitleCase}`;
                  } else {
                    return genreTitleCase;
                  }
                })
                .join(', ')}
              . <br /> Please try another search.
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
