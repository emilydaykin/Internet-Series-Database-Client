import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

const ElasticCarousel = ({ faves }) => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const responsiveBreakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  return (
    <div className='carousel'>
      {faves ? (
        <Carousel breakPoints={responsiveBreakPoints}>
          {faves.map((series) => (
            // <Item key={item}>{item}</Item>
            <Link key={series._id} to={`/series/${series._id}`} className='card'>
              <div className='card__side card__side--front'>
                <img src={series.image} alt={series.name} className='carousel__image' />
              </div>
              <div className='card__side card__side--back'>
                <p className='card__title'>{series.name}</p>
                <p className='card__details card__details--years'>
                  ({series.pilotYear}&#8212;{series.finaleYear})
                </p>
                <p className='card__details card__details--rating'>⭐️ {series.rating} ⭐️</p>
                <p className='card__details card__details--genres'>{series.genre.join(', ')}</p>
                <p className='card__details card__details--actors'>
                  {series.actors.forEach((actor) => {
                    console.log('actor', actor);
                    return <span key={actor}>actor</span>;
                    // return actor;
                  })}
                </p>
                {/* <p className='card__details card__details--actors'>{series.actors.join('<br/>')}</p> */}
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        <p>No favourites yet.</p>
      )}
    </div>
  );
};

export default ElasticCarousel;
