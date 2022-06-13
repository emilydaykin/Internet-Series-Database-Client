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
    <section className='add-series'>
      <h1>
        <span>ISDb</span> Add a Series
      </h1>
      <div className='form-wrapper'>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form__input-fields-wrapper'>
            <div className='form__left'>
              <div className='form__field form__field--name'>
                <label htmlFor='name' className='form__label'>
                  Name*
                </label>
                <input type='text' className='form__input' id='name' onChange={handleChange} />
              </div>
              <div className='form__field form__field--genre'>
                <label htmlFor='genre' className='form__label'>
                  Genre*
                </label>
                <input type='text' className='form__input' id='genre' onChange={handleChange} />
              </div>
              <div className='form__field form__field--description'>
                <label htmlFor='description' className='form__label'>
                  Description
                </label>
                <input
                  type='text'
                  className='form__input'
                  id='description'
                  onChange={handleChange}
                />
              </div>
              <div className='form__field form__field--actors'>
                <label htmlFor='actors' className='form__label'>
                  Actors
                </label>
                <input type='text' className='form__input' id='actors' onChange={handleChange} />
              </div>
            </div>
            <div className='form-right'>
              <div className='form__field form__field--pilot-year'>
                <label htmlFor='pilot-year' className='form__label'>
                  Pilot Year*
                </label>
                <input type='text' className='form__input' id='pilotYear' onChange={handleChange} />
              </div>
              <div className='form__field form__field--finale-year'>
                <label htmlFor='finale-year' className='form__label'>
                  Finale Year
                </label>
                <input
                  type='text'
                  className='form__input'
                  id='finaleYear'
                  onChange={handleChange}
                />
              </div>
              <div className='form__field form__field--avg-rating'>
                <label htmlFor='avg-rating' className='form__label'>
                  Average rating
                </label>
                <input
                  type='number'
                  step='0.1'
                  className='form__input'
                  id='rating'
                  onChange={handleChange}
                />
              </div>
              <div className='form__field form__field--poster-image'>
                <label htmlFor='poster-image' className='form__label'>
                  Poster URL*
                </label>
                <input type='text' className='form__input' id='image' onChange={handleChange} />
              </div>
            </div>
          </div>
          <div>
            <span className='footnote'>* required</span>
          </div>
          <button className='button'>Add</button>
        </form>
      </div>
    </section>
  );
};

export default AddSeries;
