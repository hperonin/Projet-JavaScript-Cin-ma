const movieSearchBox = document.getElementById("movieSearchBox");
const resultContainer = document.getElementById("resultContainer");
const loadMoreButton = document.querySelector('.button');

let currentPage = 1;
let allMovies = [];

function toggleLoadMoreButton(show) {
    loadMoreButton.style.display = show ? 'block' : 'none';
}

async function loadMovies(searchTerm, page) {
    const URL = `http://omdbapi.com/?s=${searchTerm}&page=${page}&apikey=4ef89e45`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === 'True') {

        const newMovies = data.Search.filter(movie => !allMovies.some(existingMovie => existingMovie.imdbID === movie.imdbID));
        displayMovieListe(newMovies);
        allMovies = allMovies.concat(newMovies); 
    } else {
        alert("Pas de film correspondant à la recherche.");
    }
}

function findMovies() {
    currentPage = 1;
    let searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        loadMovies(searchTerm);
        toggleLoadMoreButton(true);
    } else {
        resultContainer.innerHTML = "";
        toggleLoadMoreButton(false);
    }
}


function displayMovieListe(movies) {
    const movieBlock = document.createElement('div');
    movieBlock.classList.add('movieBlock');
    
    if (currentPage === 1) {
        resultContainer.innerHTML = "";
    }

    const maxResults = 5;

    for (let idx = 0; idx < maxResults && idx < movies.length; idx++) {
        let moviePoster = movies[idx].Poster !== "N/A" ? movies[idx].Poster : 'image_not_found.png';

        let movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container'); 
        movieContainer.innerHTML = `
            <div class="movie-item">
                <a href="movie.html?title=${encodeURIComponent(movies[idx].Title)}">
                    <div class="card">
                        <img src="${moviePoster}">
                        <div class="card-content">
                            <h3>${movies[idx].Title}</h3></a>
                            <p>${movies[idx].Year}</p>
                        </div>
                    </div>
            </div>`;

        resultContainer.appendChild(movieContainer);
    }
}


async function loadMoreMovies() {
    currentPage++; 
    let searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        await loadMovies(searchTerm, currentPage);
    } else {
        toggleLoadMoreButton(false);
    }
}
movieSearchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        findMovies();
    }
});

toggleLoadMoreButton(false);