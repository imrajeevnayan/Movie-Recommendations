document.addEventListener("DOMContentLoaded", function () {
    const movieListContainer = document.getElementById("movieList");

    function searchMovies() {
        const genreSelect = document.getElementById("genre");
        const selectedGenre = genreSelect.value;

        // Replace 'YOUR_API_KEY' with the API key you obtained from TMDb
        const apiKey = '17b66183ddee2de46c85e77cc5485306';
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre}`;

        // Clear previous search results
        movieListContainer.innerHTML = "";

        // Fetch data from TMDb
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;

                // Populate movie recommendations
                movies.forEach(movie => {
                    const movieCard = document.createElement("div");
                    movieCard.classList.add("movieCard");

                    const image = document.createElement("img");
                    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    image.alt = movie.title;

                    const title = document.createElement("h3");
                    title.textContent = movie.title;

                    movieCard.appendChild(image);
                    movieCard.appendChild(title);

                    movieListContainer.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Attach the searchMovies function to the button click event
    document.getElementById("searchButton").addEventListener("click", searchMovies);

    // Initial load with default genre (e.g., Action)
    searchMovies();
});
