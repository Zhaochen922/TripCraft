document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const createAccountBtn = document.getElementById('createAccountBtn');
  const registrationForm = document.getElementById('registrationForm');
  // Handle login
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    const userData = localStorage.getItem(username);
    if (userData) {
      const userDetails = JSON.parse(userData);
      if (userDetails.password === password) {
        login(username); // Use the login function to handle successful login
      } else {
        alert('Incorrect password. Please try again.');
      }
    } else {
      alert('Username does not exist. Please create an account.');
    }
  });

  // Toggle display of registration form
  createAccountBtn.addEventListener('click', function () {
    registrationForm.style.display = registrationForm.style.display === 'none' ? 'block' : 'none';
  });

  // Handle registration
  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPasswordl').value;
    const email = document.getElementById('email').value;

    if (!newUsername || !newPassword || !email) {
      alert('All fields are required.');
      return;
    }

    if (localStorage.getItem(newUsername)) {
      alert('This username is already taken. Please choose another.');
      return;
    }

    const newUserDetails = { username: newUsername, password: newPassword, email: email };
    localStorage.setItem(newUsername, JSON.stringify(newUserDetails));
    alert('Account created successfully!');
    login(newUsername); // Log the user in after successful registration
  });

  // Handle trip form submission
  tripForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
      country: document.getElementById('country').value,
      budget: document.getElementById('budget').value,
      days: document.getElementById('days').value,
      travelType: document.getElementById('travelType').value,
      specificNeeds: document.getElementById('specificNeeds').value
    };

    localStorage.setItem('tripData', JSON.stringify(formData));
    window.location.href = 'Plan.html'; // Redirect to Plan page after submission
  });

  // Function to handle login and setting the session
  function login(username) {
    localStorage.setItem('currentUsername', username);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'Home.html'; // Redirect to home after login
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const tripForm = document.getElementById('tripForm');
  if (tripForm) {
    tripForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = {
        country: document.getElementById('country').value,
        budget: document.getElementById('budget').value,
        days: document.getElementById('days').value,
        travelType: document.getElementById('travelType').value,
        specificNeeds: document.getElementById('specificNeeds').value
      };

      localStorage.setItem('tripData', JSON.stringify(formData));
      window.location.href = 'Plan.html'; // Redirect to Plan page after submission
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const forgetPasswordLink = document.getElementById('forgetPasswordLink');

  forgetPasswordLink.addEventListener('click', function (event) {
    event.preventDefault();
    const email = prompt("Please enter your registered email:");

    if (email === null) {
      // 用户点击了取消按钮
      return;
    }

    if (validateEmail(email)) {
      // 在这里执行发送重置密码邮件的操作
      sendResetPasswordEmail(email);
    } else {
      alert('Please enter a valid email address.');
    }
  });

  function validateEmail(email) {
    // 使用正则表达式验证电子邮件格式
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function sendResetPasswordEmail(email) {
    let userFound = false;

    for (let i = 0; i < localStorage.length; i++) {
      const username = localStorage.key(i);
      const userDetails = JSON.parse(localStorage.getItem(username));

      if (userDetails && userDetails.email === email) {
        userFound = true;
        console.log(`Sending password reset email to ${email}`);
        alert(`A password reset email has been sent to ${email}.`);
        // 在这里实现发送邮件的实际逻辑
        break;
      }
    }

    if (!userFound) {
      alert('No user registered with this email address.');
    }
  }
});
