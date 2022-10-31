const {token} = sessionStorage;
const socket = io.connect('http://localhost:3000', {
  query: {token}    //THIS IS IMPORTANT FOR AUTHENTICATION
});