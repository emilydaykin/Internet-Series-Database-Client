import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElasticCarousel from '../components/ElasticCarousel';
import { mockSeriesData } from '../__mocks__/seriesData';
import { BrowserRouter } from 'react-router-dom';

test('Assert no Favourites carousel is displayed if user has no favourited series', async () => {
  render(
    <BrowserRouter>
      <ElasticCarousel seriesList={[]} listType='favourites' />;
    </BrowserRouter>
  );

  // Correct Message:
  const NoFavouritesMessage = screen.queryByText(/no favourites yet/i);
  expect(NoFavouritesMessage).toBeInTheDocument();
  // Incorrect Message:
  const NoRecommendationsMessage = screen.queryByText(/no recommendations yet/i);
  expect(NoRecommendationsMessage).not.toBeInTheDocument();

  const carousel = screen.queryByText(/breakPoints={responsiveBreakPoints}/i);
  expect(carousel).not.toBeInTheDocument();
  const card = screen.queryByText("className='card__side card__side--front'");
  expect(card).not.toBeInTheDocument();
});

test('Assert no Recommendations carousel is displayed if user has no favourited series', async () => {
  render(
    <BrowserRouter>
      <ElasticCarousel seriesList={[]} listType='recommendations' />;
    </BrowserRouter>
  );

  // Correct message:
  const NoRecommendationsMessage = screen.queryByText(/no recommendations yet/i);
  expect(NoRecommendationsMessage).toBeInTheDocument();
  // Incorrect Message:
  const NoFavouritesMessage = screen.queryByText(/no favourites yet/i);
  expect(NoFavouritesMessage).not.toBeInTheDocument();

  const carousel = screen.queryByText(/breakPoints={responsiveBreakPoints}/i);
  expect(carousel).not.toBeInTheDocument();
  const card = screen.queryByText("className='card__side card__side--front'");
  expect(card).not.toBeInTheDocument();
});

test('Assert Favourites carousel is displayed if user has favourited series', () => {
  render(
    <BrowserRouter>
      <ElasticCarousel seriesList={mockSeriesData} listType='favourites' />;
    </BrowserRouter>
  );

  const carouselCards = screen.getAllByRole('link', { className: /card--favourites/i });
  expect(carouselCards.length).toEqual(3);

  const cardImages = screen.getAllByRole('img', { className: /carousel__image/i });
  expect(cardImages.length).toEqual(3);

  const cardBacks = screen.queryAllByText((content, element) => {
    return (
      element.tagName.toLowerCase() === 'div' && element.className === 'card__side card__side--back'
    );
  });
  expect(cardBacks.length).toEqual(3);
});

test('Assert Recommendations carousel is displayed if user has favourited series', () => {
  render(
    <BrowserRouter>
      <ElasticCarousel seriesList={mockSeriesData} listType='recommendations' />;
    </BrowserRouter>
  );

  const carouselCards = screen.getAllByRole('link', { className: /card--recommendations/i });
  expect(carouselCards.length).toEqual(3);

  const cardImages = screen.getAllByRole('img', { className: /carousel__image/i });
  expect(cardImages.length).toEqual(3);

  const cardBacks = screen.queryAllByText((content, element) => {
    return (
      element.tagName.toLowerCase() === 'div' && element.className === 'card__side card__side--back'
    );
  });
  expect(cardBacks.length).toEqual(3);
});
