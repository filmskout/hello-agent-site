document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('greet-form');
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');
  const error = document.getElementById('error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();

    if (name === '') {
      error.textContent = 'Please enter your name.';
      greeting.textContent = '';
      nameInput.focus();
      return;
    }

    error.textContent = '';
    greeting.textContent = `Hello, ${name}! Welcome to my site.`;
  });
});
