document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greet-form');
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');
  const errorContainer = document.getElementById('error');
  const errorMessage = errorContainer.querySelector('.error-message');
  const errorClose = errorContainer.querySelector('.error-close');

  function showError(message) {
    errorMessage.textContent = message;
    errorContainer.classList.add('show');
  }

  function hideError() {
    errorMessage.textContent = '';
    errorContainer.classList.remove('show');
  }

  errorClose.addEventListener('click', hideError);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();

    if (name === '') {
      showError('Please enter your name.');
      greeting.textContent = '';
      nameInput.focus();
      return;
    }

    hideError();
    greeting.textContent = `Hello, ${name}! Welcome to my site.`;
  });
});
