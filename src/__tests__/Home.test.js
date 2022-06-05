import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockSeriesData = [
  {
    _id: '628378383b4f4cf07a6ae2bc',
    name: 'Sherlock',
    genre: ['Crime', 'Drama', 'Mystery'],
    description:
      'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
    actors: ['Benedict Cumberbatch', 'Martin Freeman', 'Una Stubbs'],
    pilotYear: 2010,
    finaleYear: '2017',
    rating: 9.1,
    image:
      'https://m.media-amazon.com/images/M/MV5BNTA2MTE1NDI5OV5BMl5BanBnXkFtZTcwNzM2MzU3Nw@@._V1_QL75_UY281_CR19,0,190,281_.jpg',
    comments: []
  },
  {
    _id: '628378383b4f4cf07a6ae2b8',
    name: 'The Blacklist',
    genre: ['Crime', 'Drama', 'Mystery'],
    description:
      'A new FBI profiler, Elizabeth Keen, has her entire life uprooted when a mysterious criminal, Raymond Reddington, who has eluded capture for decades, turns himself in and insists on speaking only to her.',
    actors: ['James Spader', 'Megan Boone', 'Diego Klattenhoff'],
    pilotYear: 2013,
    finaleYear: ' ',
    rating: 8.1,
    image:
      'https://m.media-amazon.com/images/M/MV5BNDFkZDI5ZGUtYTdkOC00YTFiLWJjNjMtNTQ3ZjIxMTY2ZjMyXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_QL75_UX190_CR0,0,190,281_.jpg',
    comments: []
  },
  {
    _id: '628378383b4f4cf07a6ae2d6',
    name: 'The Dropout',
    genre: ['Biography', 'Drama'],
    description:
      "TV series that chronicles Theranos founder Elizabeth Holmes' attempt to revolutionize the healthcare industry after dropping out of college and starting a technology company.",
    actors: ['Michaela Watkins', 'Amanda Seyfried', 'Naveen Andrews'],
    pilotYear: 2022,
    finaleYear: ' ',
    rating: 7.5,
    image:
      'https://m.media-amazon.com/images/M/MV5BOTEzYzYzOTgtNDVhMS00NTkxLWExNGEtOTU1MjhkZWZjYWZmXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_QL75_UX190_CR0,0,190,281_.jpg',
    comments: []
  }
];

test('Assert loading state then series catalogue displayed upon initial render.', async () => {
  axios.get = jest.fn();

  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const loadingState = screen.getByRole('loading');
  expect(loadingState).toBeInTheDocument();

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  mockSeriesData.forEach((series) => {
    const seriesCard = screen.getByText(series.name);
    expect(seriesCard).toBeInTheDocument();
  });
});

test('Assert loading state rendered then display error message on failed response.', async () => {
  axios.get = jest.fn();
  axios.get.mockRejectedValueOnce();

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const loadingState = screen.getByRole('loading');
  expect(loadingState).toBeInTheDocument();

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  const errorMessage = screen.getByRole('error-message');
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Oh no! Something went wrong fetching all series...');
});

test('Assert search bar input is accepted and displayed correctly.', async () => {
  // Code that causes React state updates should be wrapped into `act`
  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const searchBarInput = screen.getByRole('textbox', { className: /home__search-bar/i });
  expect(searchBarInput).toBeInTheDocument();

  const searchTerm = 'sherloc';
  userEvent.type(searchBarInput, searchTerm);

  await waitFor(() => {
    expect(searchBarInput.value).toEqual(searchTerm);
  });
});

test('Assert search bar functionality: series catalogue is filtered as user searches.', async () => {
  axios.get = jest.fn();

  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );
  const searchBarInput = screen.getByRole('textbox', { className: /home__search-bar/i });
  const searchTerm = 'sherloc';
  userEvent.type(searchBarInput, searchTerm);

  const sherlockCard = screen.queryByText('Sherlock');
  expect(sherlockCard).toBeInTheDocument();

  const theOtherSeriesCards = ['Blacklist', 'Modern Family'];

  theOtherSeriesCards.forEach((seriesTitle) => {
    const seriesCard = screen.queryByText(seriesTitle);
    expect(seriesCard).not.toBeInTheDocument();
  });
});

test('Assert genre filters are displayed correctly based on series available.', async () => {
  axios.get = jest.fn();

  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  // Assert filter 'heading' is displayed
  const filterHeading = screen.getByText(/filter by genre/i, {
    className: 'home__controls-heading'
  });
  expect(filterHeading).toBeInTheDocument();

  // Assert genre options are displayed:
  const genresPresent = ['Crime', 'Drama', 'Biography'];
  genresPresent.forEach((genre) => {
    const genreFilterButton = screen.getByText(genre, { className: 'home__filter' });
    expect(genreFilterButton).toBeInTheDocument();
  });

  // Assert genres that aren't present in mockSeriesData is NOT part of filter list:
  const genresMissing = ['Fantasy', 'History', 'Reality-TV'];
  genresMissing.forEach((genre) => {
    const genreFilterButton = screen.queryByText(genre, { className: 'home__filter' });
    expect(genreFilterButton).not.toBeInTheDocument();
  });
});

// test('Assert genre filters functionality: if clicked, series catalogue will be filtered.', () => {});

// test('Assert filter works: when filter button is clicked, series catalogue is filtered.', async () => {
//   axios.get = jest.fn();

//   axios.get.mockResolvedValueOnce({ data: mockSeriesData });

//   await act(async () =>
//     render(
//       <BrowserRouter>
//         <Home />
//       </BrowserRouter>
//     )
//   );
// });

// test('Assert collapsability of search and filter controls when user clicks "hide".', () => {});
