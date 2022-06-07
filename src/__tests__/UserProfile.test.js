import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '../components/UserProfile';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { mockSeriesData } from '../__mocks__/seriesData';

// ---------- Unit Tests ---------- //

test('Assert user greeting is displayed', () => {
  render(<UserProfile />);

  const greeting = screen.getByRole('heading', { level: 1, className: 'user-profile__welcome' });
  expect(greeting).toBeInTheDocument();
  expect(greeting).toHaveTextContent('Hello');
});

test('Assert favourited series div to be displayed', () => {
  render(<UserProfile />);

  const favouriteSeriesHeading = screen.queryByText(/favourite series/i);
  expect(favouriteSeriesHeading).toBeInTheDocument();
});

test('Assert recommended series div to be displayed', () => {
  render(<UserProfile />);

  const recommendationsHeading = screen.queryByText(/other series you may like/i);
  expect(recommendationsHeading).toBeInTheDocument();
});

// ---------- Integration Tests ---------- //
// Testing to see how successfully the UserProfile component calls
// and passes props to the ElasticCarousel component inside it

test('(INT) Assert no carousel displayed if user has no favourited series', async () => {
  axios.get = jest.fn();
  axios.get.mockResolvedValueOnce({ data: [] });

  await act(async () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );
  });

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  const NoFavouritesMessage = screen.queryByText(/no favourites yet/i);
  expect(NoFavouritesMessage).toBeInTheDocument();
  const NoRecommendationsMessage = screen.queryByText(/no recommendations yet/i);
  expect(NoRecommendationsMessage).toBeInTheDocument();

  const carousel = screen.queryByText(/breakPoints={responsiveBreakPoints}/i);
  const card = screen.queryByText("className='card__side card__side--front'");
  console.log('card', card);
  expect(carousel).not.toBeInTheDocument();
  expect(card).not.toBeInTheDocument();
});

test('(INT) Assert carousels are displayed if user has favourited series', async () => {
  axios.get = jest.fn();
  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  await act(async () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );
  });

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  const NoFavouritesMessage = screen.queryByText(/no favourites yet/i);
  expect(NoFavouritesMessage).not.toBeInTheDocument();
  const NoRecommendationsMessage = screen.queryByText(/no recommendations yet/i);
  expect(NoRecommendationsMessage).not.toBeInTheDocument();

  const carouselCards = screen.getAllByRole('link', { className: /card/i });
  // at least 1 card for favourites, 1 for recommendations
  expect(carouselCards.length).toBeGreaterThanOrEqual(2);
});
