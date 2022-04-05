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
    <section>
      <h1>{series.name}</h1>
      <div className='info-wrapper'>
        <div className='poster-large'>
          <img src={series.image} alt='' />
        </div>
        <div className='info'>
          <div className='series-info'>
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
          <div className='comments-section'>
            <form onSubmit={handleCommentSubmit}>
              <div className='password field'>
                <label htmlFor='comment' className='label'>
                  Leave a comment!
                </label>
                <textarea
                  type='textarea'
                  className='input'
                  id='comment'
                  value={commentValue}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              <div className='rating field'>
                <label htmlFor='rating' className='label'>
                  Leave a rating (1-5)!
                </label>
                <input
                  type='number'
                  className='input'
                  id='rating'
                  min='1'
                  max='5'
                  value={ratingValue}
                  onChange={handleRatingChange}
                />
              </div>
              <button>Submit!</button>
            </form>
          </div>
        </div>
      </div>

      <div className='displayed-comments'>
        <h2>All Comments 💬</h2>
        {series.comments.map((comment) => {
          return (
            <div className='single-comment-line' key={comment._id}>
              <div className='individual-comment'>
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
