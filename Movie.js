const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get('title');

if (movieTitle) {
    const apiKey = "4ef89e45"; 
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

    async function fetchMovieDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Impossible de récupérer les détails du film.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du film :', error);
            return null;
        }
    }

    function displayMovieDetails(movieDetails) {
        const movieDetailsContainer = document.getElementById("movieDetails");
        if (movieDetails) {
            movieDetailsContainer.innerHTML = `
            <div class="movie-card">
                <h1>${movieDetails.Title}</h1>
                <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
                <div class="detailsMovie">
                    <p>Year: ${movieDetails.Year}</p>
                    <p>Genre: ${movieDetails.Genre}</p>
                    <p>Plot: ${movieDetails.Plot}</p>
                    <p>Awards: ${movieDetails.Awards}</p>
                    <p>Actors: ${movieDetails.Actors}</p>
                    <ul class="ratings">
                        ${movieDetails.Ratings.map(rating => `<li>${rating.Source} <br> ${rating.Value}</li>`).join('')}
                    </ul>
                    <p>Dvd : ${movieDetails.DVD}</p>
                </div>
            </div>`;
        } else {
            movieDetailsContainer.innerHTML = `<p>Détails du film non disponibles.</p>`;
        }
    }

    fetchMovieDetails(apiUrl)
        .then(movieDetails => {
            displayMovieDetails(movieDetails);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des détails du film :', error);
            const movieDetailsContainer = document.getElementById("movieDetails");
            movieDetailsContainer.innerHTML = `<p>Erreur lors de la récupération des détails.</p>`;
        });
} else {
    window.location.href = "index.html";
}