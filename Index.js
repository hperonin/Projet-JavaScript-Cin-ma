const default_url = "https://www.omdbapi.com/?apikey=4ef89e45&t=wonka";
const charList = document.getElementById("movietext");
const showMoreButton = document.getElementById("boutonSuivant");
const movieUrls = [
    "https://www.omdbapi.com/?apikey=4ef89e45&t=wonka",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%22napoleon%22",
    "http://www.omdbapi.com/?apikey=4ef89e45&t=%22Godzilla%20Minus%20One%22",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%22Night%20Swim%22",
    "http://www.omdbapi.com/?apikey=4ef89e45&t=%22comme%20un%20prince%22"
];
const movie_more_list=[
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%22amelia%27s%20children%22",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%223%20jours%20max%22",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=Iris+et+les+hommes",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%22Les%20SEGPA%20au%20ski%22",
    "https://www.omdbapi.com/?apikey=4ef89e45&t=%22May%20December%22"
];

async function fetchMovieData(list) {
    let movieData = [];
    try {
        for (const url of list) {
            const response = await fetch(url);
            const data = await response.json();
            movieData.push(data);
        } 
        return movieData;
    } catch (error) {
        console.log("Y a une erreur zebi", error);
    }
}

function displayMovieData(movieData) {
    if (movieData) {
        charList.innerHTML += `
        <div class="movie-card">
            <a href="movie.html?title=${encodeURIComponent(movieData.Title)}">
                <img src="${movieData.Poster}">
                <div class="detailsMovie">
                    <h1>${movieData.Title}</h1></a>
                    <p>Year: ${movieData.Year}</p>
                </div>
        </div>`;
    } else {
        console.log('Données de film non disponibles.');
    }
}

function getCharList(list) {
    fetchMovieData(list).then(movieDataArray => {
        movieDataArray.forEach(movieData => {
            displayMovieData(movieData);
        });
    });
}

showMoreButton.addEventListener('click', () => {
    getCharList(movie_more_list);
});


document.addEventListener('DOMContentLoaded', () => {
    // ...

    // Fonction pour rediriger vers la page des détails du film
    function redirectToMoviePage(title) {
        window.location.href = `movie.html?title=${encodeURIComponent(title)}`;
    }

    // Ajouter un gestionnaire de clic pour chaque film
    charList.addEventListener('click', (event) => {
        const movieCard = event.target.closest('.movie-card');
        if (movieCard) {
            const titleElement = movieCard.querySelector('.detailsMovie');
            if (titleElement) {
                const movieTitle = titleElement.textContent;
                redirectToMoviePage(movieTitle);
            }
        }
    });
});

getCharList(movieUrls);