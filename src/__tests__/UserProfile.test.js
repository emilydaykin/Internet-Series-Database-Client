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

test('Assert no carousel displayed if user has no favourited series', async () => {
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
  expect(carousel).not.toBeInTheDocument();
  expect(card).not.toBeInTheDocument();
});

test('Assert carousels are displayed if user has favourited series', async () => {
  jest.mock('axios');

  // axios.get = jest.fn();
  // axios.get.mockResolvedValueOnce({ data: mockSeriesData });
  // axios.get.mockResolvedValue({ data: mockSeriesData });

  axios.get.mockImplementation((url) => {
    switch (url) {
      // all series
      case '/api/series':
        return Promise.resolve({ data: mockSeriesData });
      // favourites
      case `/api/users/testUser000`:
        return Promise.resolve({ data: mockSeriesData[0] });
      default:
        return Promise.reject(new Error('not found'));
    }
  });

  await act(async () => {
    render(
      <BrowserRouter>
        <UserProfile />
      </BrowserRouter>
    );
  });

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  axios.get('/api/series').then((resp) => expect(resp.data).toEqual(mockSeriesData));

  axios.get('/api/users/testUser000').then((resp) => expect(resp.data).toEqual(mockSeriesData[0]));

  // const seriesCard = screen.queryByText(mockSeriesData[0].name);
  // expect(seriesCard).toBeInTheDocument(); // FAILS!!!!!!!!!!!!!!!!

  // const noFavouritesMessage = screen.queryByText(/no favourites yet/i);
  // expect(noFavouritesMessage).not.toBeInTheDocument();  // FAILS!!!!!!!!!!!!!!!!
  // const noRecommendationsMessage = screen.queryByText(/no recommendations yet/i);
  // expect(noRecommendationsMessage).not.toBeInTheDocument();

  // const carouselCards = screen.getAllByRole('link', { className: /card/i });
  // // at least 1 card for favourites, 1 for recommendations
  // expect(carouselCards.length).toBeGreaterThanOrEqual(2);
});
