// Getting the loggedin-user's ID
export function getLoggedInUser() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // safely in case there's no token
  } else {
    const userObject = JSON.parse(window.atob(token.split('.')[1]));
    return userObject;
  }
}

// Checking if the user is an admin:
export function isAdmin() {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return false; // safely in case there's no token
  } else {
    const userObject = JSON.parse(window.atob(token.split('.')[1]));
    return !!userObject.isAdmin; // protects from undefined
  }
}
