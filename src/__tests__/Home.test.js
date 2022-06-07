import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { mockSeriesData } from '../__mocks__/seriesData';

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

// test('Assert "clear filter" button removes chosen filters', async () => {});

test('Assert search/filter controls are hidden upon inital render', async () => {
  axios.get = jest.fn();
  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  const hiddenControlsInitial = screen.queryByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' && element.className === 'u-collapse';
  });
  expect(hiddenControlsInitial).toBeInTheDocument();

  const displayedControlsInitial = screen.queryByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' && element.className === 'home__controls';
  });
  expect(displayedControlsInitial).not.toBeInTheDocument();

  const expandControlsButtonInitial = screen.queryByText(/expand/i);
  // console.log('expandControlsButtonInitial', expandControlsButtonInitial);
  expect(expandControlsButtonInitial).toBeInTheDocument();

  const hideControlsButtonInitial = screen.queryByText(/hide/i);
  expect(hideControlsButtonInitial).not.toBeInTheDocument();
});

test("Assert that controls are displayed when user clicks on 'expand' button", async () => {
  axios.get = jest.fn();
  axios.get.mockResolvedValueOnce({ data: mockSeriesData });

  await act(async () =>
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
  );

  const expandControlsButtonInitial = screen.queryByText(/expand/i);
  userEvent.click(expandControlsButtonInitial);

  const hideControlsButton = screen.queryByText(/hide/i);
  expect(hideControlsButton).toBeInTheDocument();

  const expandControlsButtonAfterClick = screen.queryByText(/expand/i);
  expect(expandControlsButtonAfterClick).not.toBeInTheDocument();

  const hiddenControlsAfterClick = screen.queryByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' && element.className === 'u-collapse';
  });
  expect(hiddenControlsAfterClick).not.toBeInTheDocument();

  const displayedControlsAfterClick = screen.queryByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' && element.className === 'home__controls';
  });
  expect(displayedControlsAfterClick).toBeInTheDocument();
});
