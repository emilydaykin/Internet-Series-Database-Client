// Different functions for working with my token

// function checkSessionStorageToken() {
//   const token = sessionStorage.getItem('token');
//   if (!token) return false; // safely in case there's no token

//   const userObject = JSON.parse(window.atob(token.split('.')[1]));
//   return userObject;
// }

// Getting the loggedin-user's ID
export function getLoggedInUser() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // safely in case there's no token
  } else {
    const userObject = JSON.parse(window.atob(token.split('.')[1]));
    // console.log('userObject.userId', userObject.userId);
    // console.log('Logged in user object', userObject);
    return userObject.userId;
  }
}

// Checking if the user is an admin:
export function isAdmin() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // safely in case there's no token
  } else {
    const userObject = JSON.parse(window.atob(token.split('.')[1]));
    // console.log({ token });
    // console.log('userObject Admin', userObject);
    // console.log('return', !!userObject.isAdmin);
    return !!userObject.isAdmin; // protects from undefined
  }
}
