const loginStatus = document.getElementById('login-status');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async (e) => {
  try {
    // reset login status
    loginStatus.textContent = `DEFAULT STATUS`;
    loginStatus.style.opacity = 0;
    loginStatus.style.color = '#000';

    e.preventDefault();

    const userData = {
      username: usernameInput.value,
      password: passwordInput.value
    };
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const { status: statusText, message } = await response.json();
      throw new Error(message, { cause: { statusText } });
    }

    const { data } = await response.json();

    loginStatus.textContent = `${data.username} Logged in successfully.`;
    loginStatus.style.opacity = 1;
    loginStatus.style.color = 'green';

    setTimeout(() => {
      if (!!data.username) {
        location.href = 'http://localhost:8000/account';
      }
    }, 2000);
  } catch (err) {
    if (!!err?.cause?.statusText && err.cause.statusText === 'fail') {
      loginStatus.textContent = err.message;
      loginStatus.style.opacity = 1;
      loginStatus.style.color = 'red';
    } else {
      console.log(err);
    }
  }
});
