import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import Auth, { getLoggedInUser } from '../api/auth';
// import Auth from '../api/auth';
// import { shallow, configure } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

test('Assert correct items are shown in Navbar when user not logged in', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const baseUrl = 'http://localhost';

  const linkItems = screen.getAllByRole('link');
  expect(linkItems.length).toEqual(3);

  expect(linkItems[0]).toHaveTextContent(/home/i); // Home button
  expect(linkItems[0].href).toBe(`${baseUrl}/`); // Home button link

  const logInButton = screen.queryByText(/log in/i);
  expect(logInButton).toBeInTheDocument();
  expect(logInButton.href).toBe(`${baseUrl}/login`);
  const registerButton = screen.queryByText(/register/i);
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.href).toBe(`${baseUrl}/register`);

  const userProfileButton = screen.queryByText(/my profile/i);
  expect(userProfileButton).not.toBeInTheDocument();
  const addSeriesButton = screen.queryByText(/add series/i);
  expect(addSeriesButton).not.toBeInTheDocument();
});

// configure({ adapter: new Adapter() });

// test('Assert mock implementation', () => {
//   const testMock = jest
//     .fn()
//     .mockReturnValue('default1')
//     .mockImplementation(true)
//     .mockName('isUserAuthenicated');

//   // console.log('testMock', testMock);
//   console.log('testMock name', testMock.getMockName());
//   console.log('testMock return value', testMock.getMockImplementation());

//   expect(testMock).toHaveBeenCalled();
//   render(
//     <BrowserRouter>
//       <Navbar />
//     </BrowserRouter>
//   );
// });

// import defaultExportTest, { foo } from '../api/foo-bar-baz';
// jest.mock('../api/foo-bar-baz', () => {
//   const originalModule = jest.requireActual('../api/foo-bar-baz');

//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked baz'),
//     foo: 'mocked foo'
//     // foob: jest.fn(() => 'mocked baz')
//   };
// });
// test('Assert correct items are shown in Navbar when user logged in', () => {
//   // let mockIsLoggedIn = false;
//   // jest.mock('../api/auth', () => {
//   //   const originalModule = jest.requireActual('../api/auth');

//   //   // return jest.fn(() => ({
//   //   //   isLoggedIn: true
//   //   // }));

//   //   return {
//   //     __esModule: true,
//   //     ...originalModule,
//   //     // default: jest.fn(() => 'mocked baz'),
//   //     getLoggedInUser: 'mocked foo'
//   //     // getLoggedInUser: jest.fn(() => 'mocked logged in')
//   //   };
//   // });

//   const defaultExportResult = defaultExportTest();
//   console.log('defaultExportResult', defaultExportResult); // bar
//   // expect(defaultExportResult).toBe('mocked baz');
//   // expect(defaultExportTest).toHaveBeenCalled();

//   // expect(foo).toBe('mocked foo');
//   // expect(bar).toBe('bar');

//   // const navbarComponent = shallow(
//   //   <BrowserRouter>
//   //     <Navbar />
//   //   </BrowserRouter>
//   // );
//   // const navbarComponent = render(
//   //   <BrowserRouter>
//   //     <Navbar />
//   //   </BrowserRouter>
//   // );
//   // navbarComponent.setState({ isLoggedInUser: true });
//   // expect(navbarComponent.find(Notification).length).toBe(1);

//   // render(
//   //   <BrowserRouter>
//   //     <Navbar />
//   //   </BrowserRouter>
//   // );

//   // expect(getLoggedInUser()).toBe('mocked foo');
//   // const defaultExportResult = Auth();
//   // expect(defaultExportResult).toBe('mocked baz');
//   // expect(getLoggedInUser()).toBe(false);

//   // Assert Navbar items are displayed to user:
//   // const homeButton = screen.queryByText(/home/i);
//   // expect(homeButton).toBeInTheDocument();
//   // const logInButton = screen.queryByText(/log in/i);
//   // expect(logInButton).toBeInTheDocument();
//   // const registerButton = screen.queryByText(/register/i);
//   // expect(registerButton).toBeInTheDocument();

//   // const userProfileButton = screen.queryByText(/my profile/i);
//   // expect(userProfileButton).not.toBeInTheDocument();
//   // const addSeriesButton = screen.queryByText(/add series/i);
//   // expect(addSeriesButton).not.toBeInTheDocument();

//   // Assert Navbar items are links that have a to={''} redirect
// });
