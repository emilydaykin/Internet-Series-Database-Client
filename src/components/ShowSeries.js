import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSeriesBySearchTerm, createComment, deleteComment } from '../api/series';
import { addSeriesToUserFavourites, getUserFavourites } from '../api/user';
import { getLoggedInUser } from '../lib/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

const ShowSeries = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState('');

  const [favourited, setFavourited] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const show = await getSeriesBySearchTerm(id);
      console.log('show', show);
      setSeries(show);
    };
    getData();

    const getFavouritesData = async () => {
      try {
        const userFavourites = await getUserFavourites(getLoggedInUser()?.userId);
        setFavourited(!!userFavourites.find((fave) => fave._id === id));
      } catch (err) {}
    };
    getFavouritesData();
  }, []);

  async function handleDoubleClickFavourite(e) {
    // If logged in user and it's a double click:
    if (getLoggedInUser() && e.detail === 2) {
      const userObject = await addSeriesToUserFavourites(id);
      setFavourited(!favourited);
    }
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
    const data = await createComment(id, {
      text: commentValue,
      rating: ratingValue,
      createdByName: getLoggedInUser().username
    });
    setCommentValue('');
    setRatingValue('');
    setSeries(data);
  }

  async function handleCommentDelete(commentId) {
    // pass in series id and commentid:
    const data = await deleteComment(id, commentId);
    setSeries(data);
  }

  if (!series) {
    return <p>Loading series...</p>;
  }

  return (
    <section className='show-series'>
      <h1 className='show-series__title'>{series.name}</h1>

      <div className='show-series__series-wrapper'>
        <div className='show-series__poster'>
          <span
            className={getLoggedInUser() ? 'hovertext' : 'hide'}
            data-hover={`Double click the poster to '${
              !favourited ? 'favourite' : 'un-favourite'
            }' it!`}
          >
            {getLoggedInUser() && (
              <FontAwesomeIcon
                icon={favourited ? filledHeart : emptyHeart}
                className='show-series__heart'
              />
            )}
            <img src={series.image} alt='' onClick={handleDoubleClickFavourite} />
          </span>
        </div>

        <div className='show-series__info'>
          <p>
            <span>Genre</span>: {series.genre.join(', ')}
          </p>
          <p>
            <span>Plot</span>: {series.description}
          </p>
          <p>
            <span>Actors</span>: {series.actors.join(', ')}
          </p>
          <p>
            <span>Pilot Year</span>: {series.pilotYear}
          </p>
          <p>
            <span>Finale Year</span>: {series.finaleYear}
          </p>
          <p>
            <span>Average IMDb Rating</span>: {series.rating} ⭐️
          </p>
        </div>
      </div>
      <div className='show-series__comments-section'>
        <h2 className='u-margin-bottom-small'>Comments 💬</h2>
        <div className='show-series__comments-content'>
          <div className='show-series__leave-comments-section'>
            <form onSubmit={handleCommentSubmit} className='comments-form'>
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
          <div className='show-series__displayed-comments'>
            {series.comments.length === 0 ? (
              <p>
                <span className='show-series__no-comments'>No comments yet.</span>
                <br /> Have you watched {series.name}? <br /> Be the first to leave a comment!
              </p>
            ) : (
              series.comments.map((comment) => {
                return (
                  <div className='show-series__single-comment-line' key={comment._id}>
                    <div className='show-series__individual-comment'>
                      <p>{comment.text}</p>&emsp;
                      <p>{comment.rating}</p>
                    </div>
                    {getLoggedInUser().userId === comment.createdById && (
                      <button onClick={() => handleCommentDelete(comment._id)}>❌</button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowSeries;
