const urlPath = 'http://localhost:3000/api/auth';

const myForm = document.querySelector('form');

const callFetch = (url, data) => {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
      window.location = '/chat.html';
    })
    .catch(console.war);
}

myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      data[el.name] = el.value;
    }
  }

  callFetch(`${urlPath}/login`, data);
});

function handleCredentialResponse(response) {
  const body = { idToken: response.credential };
  callFetch(`${urlPath}/google`, body);
}

const signOut = document.getElementById('g_id_signout');

signOut.onclick = () => {
  google.accounts.id.revoke(localStorage.getItem('gEmail'), () => {
    localStorage.clear();
    location.reload();
  });
}