document.addEventListener('DOMContentLoaded', function () {

  const resultsDiv = document.getElementById('planResults');
  const storedData = localStorage.getItem('tripData');

  if (storedData) {
    const tripData = JSON.parse(storedData);
    let resultsHTML = `<h3>Your Personalized Travel Plan</h3>
                       <p>Destination: ${tripData.country}</p>
                       <p>Budget: $${tripData.budget}</p>
                       <p>Number of Days: ${tripData.days} day(s)</p>
                       <p>Travel Type: ${tripData.travelType}</p>
                       ${tripData.specificNeeds ? `<p>Specific Needs: ${tripData.specificNeeds}</p>` : `<p>No specific needs indicated.</p>`}`;

    resultsDiv.innerHTML = resultsHTML;
    resultsDiv.style.display = 'block'; // Make sure the results are visible
  } else {
    console.log('No data found in local storage.');
  }
});
