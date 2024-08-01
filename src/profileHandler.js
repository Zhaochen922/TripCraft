document.addEventListener('DOMContentLoaded', function () {
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  const logoutButton = document.getElementById('logoutButton');

  resetPasswordForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value.trim();
    const username = localStorage.getItem('currentUsername'); // Retrieve the stored username

    if (!username) {
      alert('No user logged in.');
      return; // Exit if no username is found
    }

    if (newPassword) {
      const userDataString = localStorage.getItem(username);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.password = newPassword; // Update password
        localStorage.setItem(username, JSON.stringify(userData)); // Save back to storage
        alert('Password reset successfully.');
      } else {
        alert('Failed to retrieve user data.');
      }
    } else {
      alert('Please enter a new password.');
    }
  });

  logoutButton.addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUsername');
    window.location.href = 'Home.html';
  });
});

