// io() comes from ./socket.io/socket.io.js

const urlPath = 'http://localhost:3000/api/auth';

// Html elements
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');

const socket = io({
  'extraHeaders': {
    'x-token': localStorage.getItem('token'),
  }
});

const connectSocket = async () => {
  socket.on('connect', () => { });
  socket.on('disconnect', () => { });

  // Get last 10 messages
  socket.on('get-messages', (payload) => {
    const msgHtml = payload.map(msg => {
      return `
        <li>
          <p>
            <span class="text-primary">${msg.name}: </span>
            <span>${msg.message}</span>
          </p>
        </li>
      `;
    });

    ulMessages.innerHTML = msgHtml.join('');
  });

  // Get active users
  socket.on('active-users', (payload) => {
    const usersHtml = payload.map(user => {
      return `
        <li>
          <p>
            <h5 class="text-success">${user.name}</h5>
            <span class="fs-6 text-muted">${user.uid}</span>
          </p>
        </li>
      `;
    });

    ulUsers.innerHTML = usersHtml.join('');
  });

  // Listen private message
  socket.on('get-private-message', (payload) => {
    console.log(payload);
  });
};

txtMessage.addEventListener('keyup', ({ keyCode }) => {
  if (keyCode !== 13) {
    return;
  }

  const uid = txtUid.value.trim();
  const message = txtMessage.value.trim();

  if (message.length === 0) {
    return;
  }

  // Send message
  socket.emit('send-message', { message, uid });
});

const validateJwt = async () => {
  const token = localStorage.getItem('token');

  if (!token || token.length <= 10) {
    window.location = '/';
    throw new Error('No token session');
  }

  await fetch(urlPath, {
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
    })
    .catch(console.war);

  await connectSocket();
};


const main = async () => {
  const isValid = await validateJwt();
};

main();