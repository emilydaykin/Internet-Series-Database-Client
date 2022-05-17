import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeriesById, createComment, deleteComment } from '../api/series';
import { getLoggedInUser } from '../lib/auth';

const ShowSeries = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState('');

  useEffect(() => {
    const getData = async () => {
      const show = await getSeriesById(id);
      console.log('show', show);
      setSeries(show);
    };
    getData();
  }, []);

  // console.log('show', series);

  if (!series) {
    return <p>Loading series...</p>;
  }

  function handleCommentChange(e) {
    setCommentValue(e.target.value);
  }

  function handleRatingChange(e) {
    setRatingValue(e.target.value);
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    console.log('submitted!');
    console.log(e.target.value);
    const data = await createComment(id, { text: commentValue, rating: ratingValue });
    setCommentValue('');
    setRatingValue('');
    setSeries(data);
  }

  async function handleCommentDelete(commentId) {
    // pass in series id and commentid:
    const data = await deleteComment(id, commentId);
    setSeries(data);
  }

  return (
    <section className='show-series'>
      <h1>{series.name}</h1>
      <div className='show-series__wrapper'>
        <div className='show-series__poster'>
          <img src={series.image} alt='' />
        </div>
        <div className='show-series__info-wrapper'>
          <div className='show-series__info'>
            <p>
              <span>Genre</span>: {series.genre.join(', ')}
            </p>
            <p>
              <span>Pilot Year</span>: {series.pilotYear}
            </p>
            <p>
              <span>Finale Year</span>: {series.finaleYear}
            </p>
            <p>
              <span>Plot</span>: {series.description}
            </p>
            <p>
              <span>Average Rating</span>: {series.rating} ⭐️
            </p>
          </div>
          <div className='show-series__leave-comments-section'>
            <form onSubmit={handleCommentSubmit} className='form'>
              <div className='form__field form__field--comment'>
                <label htmlFor='comment' className='form__label'>
                  Leave a comment!
                </label>
                <textarea
                  type='textarea'
                  className='form__input'
                  id='comment'
                  value={commentValue}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              <div className='form__field form__field--rating'>
                <label htmlFor='rating' className='form__label'>
                  Leave a rating (1-5)!
                </label>
                <input
                  type='number'
                  className='form__input'
                  id='rating'
                  min='1'
                  max='5'
                  value={ratingValue}
                  onChange={handleRatingChange}
                />
              </div>
              <button className='button'>Submit!</button>
            </form>
          </div>
        </div>
      </div>

      <div className='show-series__displayed-comments'>
        <h2 className='u-margin-bottom-small'>All Comments 💬</h2>
        {series.comments.map((comment) => {
          return (
            <div className='show-series__single-comment-line' key={comment._id}>
              <div className='show-series__individual-comment'>
                <p>{comment.text}</p>
                <p>{comment.rating}</p>
              </div>
              {getLoggedInUser() === comment.createdBy && (
                <button onClick={() => handleCommentDelete(comment._id)}>❌</button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ShowSeries;
