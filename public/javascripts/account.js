const logout = document.getElementById('logout');
const logoutStatus = document.getElementById('logout-status');

logout.addEventListener('click', async (e) => {
  try {
    // reset login status
    logoutStatus.textContent = `DEFAULT STATUS`;
    logoutStatus.style.opacity = 0;
    logoutStatus.style.color = '#000';

    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/auth/logout');

    if (!response.ok) {
      const { status: statusText, message } = await response.json();
      throw new Error(message, { cause: { statusText } });
    }

    logoutStatus.textContent = `Logged out successfully.`;
    logoutStatus.style.opacity = 1;
    logoutStatus.style.color = 'green';

    setTimeout(() => {
      location.href = 'http://localhost:8000/login';
    }, 2000);
  } catch (err) {
    if (!!err?.cause?.statusText && err.cause.statusText === 'fail') {
      logoutStatus.textContent = err.message;
      logoutStatus.style.opacity = 1;
      logoutStatus.style.color = 'red';
    } else {
      console.log(err);
    }
  }
});
