const callback = () => {
  console.log('Hello world');
};

setTimeout(callback, 1000);

const getUserById = (id, callbackHandler) => {
  const user = {
    id,
    userName: 'Israel',
  };

  setTimeout(() => {
    callbackHandler(user);
  }, 1500);
}

getUserById(10, (data) => {
  console.log(data.id);
  console.log(data.userName.toUpperCase());
});