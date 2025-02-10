document.onreadystatechange = function () {
    var state = document.readyState;
    if (state == 'interactive') {
         document.getElementById('contents').style.visibility="hidden";
    } else if (state == 'complete') {
        setTimeout(function(){
           document.getElementById('interactive');
           document.getElementById('loader').style.display="none";
           document.getElementById('overlay').style.zIndex="10000"; /* Overlay should be on top after loader disappears */
           document.getElementById('overlay').style.opacity="1"; /* Overlay should become visible */
           setTimeout(function(){
              document.getElementById('overlay').style.opacity="1"; /* Overlay should fade out */
              setTimeout(function(){
                 document.getElementById('overlay').style.display="none";
                 document.getElementById('contents').style.visibility="visible";
              }, 1);
           }, 1);
        },4000);
    }
  }

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const breweryGrid = document.querySelector('.brewery-grid');
const brewerySection = document.getElementById('brewery-section');

// Add event listener to search button
searchButton.addEventListener('click', searchBreweries);

// Function to search breweries
async function searchBreweries() {
    const query = searchInput.value.trim();
    const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            breweryGrid.innerHTML = `<h2>No breweries found matching "${query}"</h2>`;
        } else {
            // Render brewery data
            renderBreweries(data);
            // Show the brewery grid container
            brewerySection.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error searching breweries:', error);
        breweryGrid.innerHTML = `<h2>Error searching breweries for "${query}"</h2>`;
    }
}

// Function to render breweries
function renderBreweries(data) {
    breweryGrid.innerHTML = '';

    data.forEach((brewery) => {
        const breweryCard = document.createElement('div');
        breweryCard.className = 'brewery-card';

        breweryCard.innerHTML = `
            <h2>${brewery.name}</h2>
            <p>Location: ${brewery.city}, ${brewery.state}</p>
            <p>Phone: ${brewery.phone || 'N/A'}</p>
            <p>Type: ${brewery.brewery_type}</p>
            <p>Number of Beers: ${brewery.beer_count || 'N/A'}</p>
        `;

        breweryGrid.appendChild(breweryCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const header = document.querySelector('header');

    breweryGrid.addEventListener('scroll', () => {
        const scrollTop = breweryGrid.scrollTop;
        const maxScroll = breweryGrid.scrollHeight - breweryGrid.clientHeight;
        const opacity = 1 - (scrollTop / maxScroll);

        heroSection.style.opacity = opacity;
        header.style.opacity = opacity;
    });
});

document.getElementById('search-button').addEventListener('click', function() {
    document.getElementById('brewery-section').scrollIntoView({ behavior: 'smooth' });
});


