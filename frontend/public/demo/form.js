// JavaScript code to connect to an API for matching college details and displaying results
// This script sends form data to a backend API, retrieves matching colleges, and displays them.
// Replace 'https://your-api-endpoint.com/find-colleges' with your actual API URL.
// Ensure your API handles POST requests with JSON data and returns an array of matching colleges.

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('collegeForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      class10: parseFloat(document.getElementById('class10').value),
      class12: parseFloat(document.getElementById('class12').value),
      exam: document.getElementById('exam').value.trim(),
      score: document.getElementById('score').value.trim(),
      course: document.getElementById('course').value,
      location: document.getElementById('location').value.trim(),
      budget: document.getElementById('budget').value.trim(),
      collegeType: document.getElementById('collegeType').value,
      distance: document.getElementById('distance').value
    };

    // Basic validation
    if (!formData.name || !formData.email || isNaN(formData.class10) || isNaN(formData.class12) || !formData.course) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    // Show loading indicator (optional)
    showLoading(true);

    // Connect to API
    findCollegesViaAPI(formData);
  });

  // Function to call the API
  async function findCollegesViaAPI(data) {
    try {
      const response = await fetch('https://your-api-endpoint.com/find-colleges', { // Replace with your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers, e.g., 'Authorization': 'Bearer your-token'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const colleges = await response.json(); // Assume API returns an array of college objects
      displayResults(colleges, data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      displayError('Failed to fetch colleges. Please try again later.');
    } finally {
      showLoading(false);
    }
  }

  // Function to display results
  function displayResults(colleges, data) {
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';
    resultsContainer.style.marginTop = '2rem';
    resultsContainer.style.padding = '1rem';
    resultsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    resultsContainer.style.borderRadius = '8px';
    resultsContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

    if (colleges && colleges.length > 0) {
      resultsContainer.innerHTML = `<h3>Recommended Colleges for ${data.name}:</h3><ul>`;
      colleges.forEach(college => {
        // Customize display based on API response structure (e.g., assume each college has 'name', 'course', 'location', etc.)
        resultsContainer.innerHTML += `<li><strong>${college.name}</strong> - ${college.course || 'N/A'} in ${college.location || 'N/A'} (${college.type || 'N/A'})</li>`;
      });
      resultsContainer.innerHTML += '</ul>';
    } else {
      resultsContainer.innerHTML = '<h3>No matching colleges found. Try adjusting your preferences.</h3>';
    }

    // Append results below the form
    const formContainer = document.querySelector('.form-container');
    const existingResults = document.getElementById('results');
    if (existingResults) existingResults.remove();
    formContainer.appendChild(resultsContainer);
  }

  // Function to display errors
  function displayError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error';
    errorContainer.style.marginTop = '2rem';
    errorContainer.style.padding = '1rem';
    errorContainer.style.backgroundColor = '#f8d7da';
    errorContainer.style.color = '#721c24';
    errorContainer.style.borderRadius = '8px';
    errorContainer.style.border = '1px solid #f5c6cb';
    errorContainer.innerHTML = `<strong>Error:</strong> ${message}`;

    const formContainer = document.querySelector('.form-container');
    const existingError = document.getElementById('error');
    if (existingError) existingError.remove();
    formContainer.appendChild(errorContainer);
  }

  // Function to show/hide loading indicator
  function showLoading(show) {
    let loader = document.getElementById('loader');
    if (show) {
      if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.style.marginTop = '2rem';
        loader.style.textAlign = 'center';
        loader.innerHTML = '<p>Loading colleges...</p>';
        document.querySelector('.form-container').appendChild(loader);
      }
    } else {
      if (loader) loader.remove();
    }
  }
});














// JavaScript code to load and display Indian colleges in the grid.
// On page load, it displays a default set of colleges. You can modify to fetch from an API.
// Replace with real API logic if needed.

document.addEventListener('DOMContentLoaded', function() {
  const grid = document.getElementById('collegesGrid');

  // Load default colleges on page load (mock data for Indian colleges)
  loadDefaultColleges();

  // Function to load default/mock colleges
  function loadDefaultColleges() {
    const mockColleges = [
      {
        name: 'IIT Delhi',
        image: 'https://via.placeholder.com/300x200?text=IIT+Delhi',
        description: 'Indian Institute of Technology Delhi is a premier engineering college in India, known for its excellence in technology and research. Located in New Delhi, it offers various engineering courses.'
      },
      {
        name: 'AIIMS Delhi',
        image: 'https://via.placeholder.com/300x200?text=AIIMS+Delhi',
        description: 'All India Institute of Medical Sciences Delhi is a leading medical college in India, renowned for its medical education and healthcare services. Situated in New Delhi.'
      },
      {
        name: 'Christ University',
        image: 'https://via.placeholder.com/300x200?text=Christ+University',
        description: 'Christ University in Bangalore is a private deemed-to-be-university offering courses in commerce, arts, and more. Known for its vibrant campus and holistic education.'
      },
      {
        name: 'Jawaharlal Nehru University (JNU)',
        image: 'https://via.placeholder.com/300x200?text=JNU',
        description: 'JNU in New Delhi is a central university famous for its arts and humanities programs. It emphasizes interdisciplinary learning and social sciences.'
      },
      {
        name: 'National Law School of India University (NLSIU)',
        image: 'https://via.placeholder.com/300x200?text=NLSIU',
        description: 'Located in Bangalore, NLSIU is India\'s premier law school, offering undergraduate and postgraduate law programs with a focus on legal education and research.'
      },
      {
        name: 'Indian Institute of Management Ahmedabad (IIM-A)',
        image: 'https://via.placeholder.com/300x200?text=IIM+Ahmedabad',
        description: 'IIM Ahmedabad is a top management institute in India, known for its MBA programs and contributions to business education. Situated in Ahmedabad, Gujarat.'
      }
      // Add more colleges as needed
    ];

    displayResults(mockColleges);
  }

  // Optional: Function to fetch from API (uncomment and modify if you want to load from API on load)
  // async function loadCollegesFromAPI() {
  //   try {
  //     const response = await fetch('https://your-api-endpoint.com/get-all-colleges');
  //     const colleges = await response.json();
  //     displayResults(colleges);
  //   } catch (error) {
  //     displayError('Failed to load colleges.');
  //   }
  // }
  // loadCollegesFromAPI(); // Uncomment to use API

  function displayResults(colleges) {
    grid.innerHTML = ''; // Clear any existing content
    if (colleges && colleges.length > 0) {
      colleges.forEach(college => {
        const card = document.createElement('div');
        card.className = 'college-card';
        card.innerHTML = `
          <img src="${college.image || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${college.name}">
          <div class="content">
            <h3>${college.name}</h3>
            <p>${college.description || 'No description available.'}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    } else {
      grid.innerHTML = '<p>No colleges available.</p>';
    }
  }

  function displayError(message) {
    grid.innerHTML = `<p style="color: red;">${message}</p>`;
  }
});
