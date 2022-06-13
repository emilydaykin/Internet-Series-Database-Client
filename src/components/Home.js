import React from 'react';
import { useState, useEffect } from 'react';
import { getAllSeries, filterSeriesByGenre, getSeriesBySearchTerm } from '../api/series';
import { Link } from 'react-router-dom';

const Home = () => {
  const [series, setSeries] = useState(null);
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [showControls, setShowControls] = useState(false);
  const [filtersChosen, setFiltersChosen] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const allSeries = await getAllSeries();
        setSeries(allSeries.data.sort(() => 0.5 - Math.random()));
        const allGenres = allSeries.data.map((series) => series.genre);
        setUniqueGenres([...new Set(allGenres.flat())]);
      } catch (err) {
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
      } catch (err) {}
    };
    filterSeries();
  }, [filtersChosen]);

  const refreshPage = () => {
    window.location.reload(true);
  };

  const handleExpand = () => {
    setShowControls(!showControls);
  };

  const handleSearch = async (e) => {
    setSearchInput(e.target.value);
    const searchSeries = async () => {
      try {
        const searchResults = await getSeriesBySearchTerm(e.target.value);
        setSeries(searchResults);
      } catch (err) {}
    };
    searchSeries();
  };

  const selectFilter = (e) => {
    setSearchInput('');
    const genreChosen = e.target.childNodes[0].data.toLowerCase();
    if (!filtersChosen.includes(genreChosen)) {
      setFiltersChosen([...filtersChosen, genreChosen]);
    } else {
      const genresLeft = filtersChosen.filter((genre) => genre !== genreChosen);
      setFiltersChosen(genresLeft);
    }
    e.target.classList.toggle('home__filter--selected');
  };

  const clearFilter = (e) => {
    setFiltersChosen([]);
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
      <h1 className='home__heading u-margin-bottom-small'>
        <span onClick={refreshPage}>ISDb</span>&nbsp;Internet Series Database
      </h1>
      <div className='home__content'>
        <div className='home__controls-wrapper'>
          <div className={showControls ? 'home__controls' : 'home__collapse-controls'}>
            <input
              type='text'
              className='home__search-bar'
              placeholder='Search title, actor, plot, year, rating, genre'
              onChange={handleSearch}
              value={searchInput}
            />
            <p className='home__controls-heading'>
              {/* {filtersChosen.length > 0 ? (
                <button className='home__clear-filter' onClick={clearFilter}>
                  Clear Filter
                </button>
              ) : ( */}
              Filter By Genre:
              {/* )} */}
            </p>
            {uniqueGenres.length !== 0 ? (
              <div className='home__filters'>
                {uniqueGenres.map((genre) => (
                  <div
                    key={genre}
                    className='home__filter'
                    onClick={selectFilter}
                    value={genre.toLowerCase()}
                    name={genre.toLowerCase()}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div
            className={
              showControls
                ? 'home__expand-controls home__expand-controls--hide'
                : 'home__expand-controls home__expand-controls--expand'
            }
            onClick={handleExpand}
          >
            {showControls ? (
              <p>
                {screen.width >= 460 ? <span>&laquo;</span> : <span>&uarr;</span>}&ensp;hide search
              </p>
            ) : (
              <p>
                {screen.width >= 460 ? <span>&raquo;</span> : <span>&darr;</span>}&ensp;expand
                search
              </p>
            )}
          </div>
        </div>
        <div className='home__catalogue' role='series-catalogue'>
          {isError && (
            <p className='home__empty-catalogue' role='error-message'>
              Oh no! Something went wrong fetching all series...
            </p>
          )}
          {!series ? (
            <p className='home__empty-catalogue' role='loading'>
              Loading series...
            </p>
          ) : series.length == 0 && filtersChosen.length > 0 ? (
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
              .
              <br />
              <br />
              Please try another search.
            </p>
          ) : series.length == 0 && searchInput ? (
            <p className='home__empty-catalogue'>
              No series with a title, actor, plot, year or rating matching your search term of "
              {searchInput}".
              <br />
              <br />
              Please try another search.
            </p>
          ) : (
            series.map((show) => (
              <div key={show._id} className='home__series-card'>
                <Link className='home__series-link' to={`/series/${show._id}`}>
                  <h2 className='home__subheading'>{truncateText(show.name, 23)}</h2>
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
