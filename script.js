document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greet-form');
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');
  const error = document.getElementById('error');
  const errorMessage = document.getElementById('error-message');
  const dismissError = document.getElementById('dismiss-error');

  const hideError = () => {
    error.classList.add('hidden');
    errorMessage.textContent = '';
  };

  dismissError.addEventListener('click', hideError);

  nameInput.addEventListener('input', () => {
    if (!error.classList.contains('hidden')) {
      hideError();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();

    if (name === '') {
      errorMessage.textContent = 'Please enter your name.';
      error.classList.remove('hidden');
      greeting.textContent = '';
      nameInput.focus();
      return;
    }

    hideError();
    greeting.textContent = `Hello, ${name}! Welcome to my site.`;
  });
});
