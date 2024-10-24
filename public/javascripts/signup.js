const signupStatus = document.getElementById('signup-status');
const signupForm = document.getElementById('signup-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const genderInput = document.getElementById('gender');

signupForm.addEventListener('submit', async (e) => {
  try {
    // reset signup status
    signupStatus.textContent = `DEFAULT STATUS`;
    signupStatus.style.opacity = 0;
    signupStatus.style.color = '#000';

    e.preventDefault();

    const userData = {
      email: emailInput.value,
      gender: genderInput.value,
      username: usernameInput.value,
      password: passwordInput.value
    };
    const response = await fetch('http://localhost:8000/api/auth/signup', {
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

    singupStatus.textContent = `${data.username} signed up successfully.`;
    singupStatus.style.opacity = 1;
    singupStatus.style.color = 'green';

    setTimeout(() => {
      if (!!data.username) {
        location.href = 'http://localhost:8000/login';
      }
    }, 2000);
  } catch (err) {
    if (!!err?.cause?.statusText && err.cause.statusText === 'fail') {
      singupStatus.textContent = err.message;
      singupStatus.style.opacity = 1;
      singupStatus.style.color = 'red';
    } else {
      console.log(err);
    }
  }
});
