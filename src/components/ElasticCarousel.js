import React from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

const ElasticCarousel = ({ seriesList, listType }) => {
  const responsiveBreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  // console.log('seriesList FROM INSIDE ElasticCAROUSEL: ------ ', seriesList);
  // console.log('listType FROM INSIDE ElasticCAROUSEL: ------ ', listType);

  return (
    <div className='carousel'>
      {seriesList && seriesList.length > 0 ? (
        <Carousel breakPoints={responsiveBreakPoints}>
          {seriesList.map((series) => (
            <Link
              key={series._id}
              to={`/series/${series._id}`}
              className={`card card--${listType}`}
            >
              <div className='card__side card__side--front'>
                <img src={series.image} alt={series.name} className='carousel__image' />
              </div>
              <div className='card__side card__side--back'>
                <p className='card__title'>{series.name}</p>
                <p className='card__details card__details--years'>
                  ({series.pilotYear}&#8212;{series.finaleYear})
                </p>
                <p className='card__details card__details--rating'>⭐️ {series.rating} ⭐️</p>
                <p className='card__details card__details--genres'>{series.genre.join(' • ')}</p>
                <p className='card__details card__details--actors'>
                  {series.actors.map((actor) => (
                    <span key={actor}>{actor}</span>
                  ))}
                </p>
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        <p>
          {listType === 'favourites'
            ? 'No favourites yet.'
            : 'No recommendations yet. Add some series to your Favourites list get some recommendations!'}
        </p>
      )}
    </div>
  );
};

export default ElasticCarousel;
