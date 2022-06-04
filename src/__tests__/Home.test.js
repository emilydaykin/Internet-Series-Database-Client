import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';

test('Assert loading state then series catalogue displayed upon initial render', async () => {
  axios.get = jest.fn();

  const response = [
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

  axios.get.mockResolvedValueOnce({ data: response });

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  const loadingState = screen.getByRole('loading');

  expect(loadingState).toBeInTheDocument();

  await waitFor(() => expect(axios.get).toHaveBeenCalled());

  response.forEach((series) => {
    const seriesCard = screen.getByText(series.name);
    expect(seriesCard).toBeInTheDocument();
  });
});

test('Assert loading state rendered then display error message on failed response', () => {});

test('Assert search bar input is accepted and displayed correctly', () => {});

test('Assert filter works', () => {});

test('Assert collapability of search and filter controls when user clicks "hide"', () => {});
