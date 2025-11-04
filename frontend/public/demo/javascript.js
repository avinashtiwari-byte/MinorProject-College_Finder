const range = document.getElementById('fee-max');
  const valueDisplay = document.getElementById('fee-value');
  if(range){
    range.addEventListener('input', () => {
      valueDisplay.textContent = `₹${range.value * 1000}`;
    });
  }

  // Interactive input highlighting
  const inputs = document.querySelectorAll('#college-search-form input, #college-search-form select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#1a237e';
      input.style.boxShadow = '0 0 6px rgba(26,35,126,0.3)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = '#ccc';
      input.style.boxShadow = 'none';
    });
  });

  // Button hover animations
  const buttons = document.querySelectorAll('#college-search-form button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => btn.style.transform = 'translateY(-2px)');
    btn.addEventListener('mouseout', () => btn.style.transform = 'translateY(0)');
  });