import React from 'react';
import { useState } from 'react';
import { createSeries } from '../api/series';
import { useNavigate } from 'react-router-dom';

const AddSeries = () => {
  const navigate = useNavigate();
  const [newSeries, setNewSeries] = useState({
    name: '',
    genre: [],
    description: '',
    actors: [],
    pilotYear: 0,
    finaleYear: 0,
    rating: 0,
    image: ''
  });

  function handleChange(e) {
    // console.log('e.target.id', e.target.id);
    // console.log('e.target.value', e.target.value);

    if (e.target.id === 'genre' || e.target.id === 'actors') {
      const splitString = e.target.value.split(',');
      const cleanedArray = splitString.map((genre) => genre.trim());
      setNewSeries({ ...newSeries, [e.target.id]: cleanedArray });
    } else {
      setNewSeries({ ...newSeries, [e.target.id]: e.target.value });
    }
  }

  console.log('newSeries', newSeries);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submit clicked!');
    // loginUser({ email: emailValue, password: passwordValue });
    await createSeries({
      name: newSeries.name,
      genre: newSeries.genre,
      description: newSeries.description,
      actors: newSeries.actors,
      pilotYear: newSeries.pilotYear,
      finaleYear: newSeries.finaleYear,
      rating: newSeries.rating,
      image: newSeries.image
    });
    navigate('/');
  }

  return (
    <section>
      <h1>
        <span>LSDb</span> Add a Series
      </h1>
      <div className='add-series-form-wrapper'>
        <form className='add-series-form' onSubmit={handleSubmit}>
          <div className='input-fields-wrapper'>
            <div className='form-left'>
              <div className='name field'>
                <label htmlFor='name' className='label'>
                  Name*
                </label>
                <input type='text' className='input' id='name' onChange={handleChange} />
              </div>
              <div className='genre field'>
                <label htmlFor='genre' className='label'>
                  Genre*
                </label>
                <input type='text' className='input' id='genre' onChange={handleChange} />
              </div>
              <div className='description field'>
                <label htmlFor='description' className='label'>
                  Description
                </label>
                <input type='text' className='input' id='description' onChange={handleChange} />
              </div>
              <div className='actors field'>
                <label htmlFor='actors' className='label'>
                  Actors
                </label>
                <input type='text' className='input' id='actors' onChange={handleChange} />
              </div>
            </div>
            <div className='form-right'>
              <div className='pilot-year field'>
                <label htmlFor='pilot-year' className='label'>
                  Pilot Year*
                </label>
                <input type='text' className='input' id='pilotYear' onChange={handleChange} />
              </div>
              <div className='finale-year field'>
                <label htmlFor='finale-year' className='label'>
                  Finale Year
                </label>
                <input type='text' className='input' id='finaleYear' onChange={handleChange} />
              </div>
              <div className='avg-rating field'>
                <label htmlFor='avg-rating' className='label'>
                  Average rating
                </label>
                <input
                  type='number'
                  step='0.1'
                  className='input'
                  id='rating'
                  onChange={handleChange}
                />
              </div>
              <div className='poster-image field'>
                <label htmlFor='poster-image' className='label'>
                  Poster URL*
                </label>
                <input type='text' className='input' id='image' onChange={handleChange} />
              </div>
            </div>
          </div>
          <div>
            <span className='footnote'>* required</span>
          </div>
          <button>Add</button>
        </form>
      </div>
    </section>
  );
};

export default AddSeries;
