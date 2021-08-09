//TMDB

const API_KEY = 'api_key=95cf3273f53ef50fc7371e3b988593c2';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');

const getMovies = async (url) => {
    try {
        const results = await axios.get(url);
        console.log(results.data.results);
        showMovies(results.data.results);
    } catch (e) {
        return 'Api not working sorry...';
    }
}

const showMovies = (res) => {
    main.innerHTML = '';

    console.log(res[1].poster_path)
    for (let movie of res) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}"
            alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${getColor(movie.vote_average)}">${movie.vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${movie.overview}
            </div>`;

        main.append(movieCard);
    }
}

const getColor = (vote) => {
    if (vote >= 8.0) {
        return 'green';
    }
    else if (vote < 8.0 && vote >= 5.0) {
        return 'orange';
    }
    else {
        return 'red';
    }
}

getMovies(POPULAR_URL);