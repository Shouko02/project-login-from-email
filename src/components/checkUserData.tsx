export const checkUserData = () => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    return userData;
  }
  return null;
};
