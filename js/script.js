/* JavaScript Assignment - 4 | Deep Biswas - 200554124 */
// Adding Dynamic Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Global Variables
const windowText = document.querySelector('.window-text');
const searchText = document.getElementById('searchText');
const searchBtn = document.getElementById('searchBtn');
const mainWindow = document.querySelector('.main-window');
const movieList = document.querySelector('.movies');
const tmdbCredit = document.getElementById('tmdbCredit');

// Credentials Handler JS 
const showCredentials = document.getElementById('showCr');
const dynamicCrdits = document.querySelector('.dynamicCrs');

showCredentials.addEventListener('click', function(){
    if (showCredentials.textContent === 'Show Credentials') {
        dynamicCrdits.textContent = 'Deep Biswas - 200554124';
        dynamicCrdits.style.color = '#f5f5f5';
        dynamicCrdits.style.fontFamily = 'SF-Pro, sans-serif';
        dynamicCrdits.style.margin = '-20px';
        showCredentials.textContent = 'Hide Credentials';  
    } else {
        showCredentials.textContent = 'Show Credentials';
        dynamicCrdits.textContent = '';
    }
});
// Credentials Handler JS TO BE removed after graded and while expanding the project

// API Credentials
const apiKey = 'e4be2d8d86fbfd83ce907eca1f0262ab';
const baseUrl = 'https://api.themoviedb.org/3/';

tmdbCredit.addEventListener('click', function(){
    window.open('https://developer.themoviedb.org/reference/intro/getting-started', '_blank');
});

// Fetch Trending Movies
function fetchTrendingMovies(){
    const url = `${baseUrl}movie/popular?language=en-US&page=1&api_key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(json => displayTrendingMovies(json));
}

// Display Trending Movies
function displayTrendingMovies(json){
    if (!json) {
        return;
    }
    if (!json.results) {
        console.error('Invalid data:', json);
        return;
    }
    movieList.innerHTML = '';
    movieList.style = '';
    movieList.style.display = 'grid';
    movieList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(15em, 1fr))';
    movieList.style.gridGap = '1.2rem';
    movieList.style.marginTop = '1rem';
    mainWindow.style.padding = '2rem';
    const moviesArray = json.results;
    for (let i=0; i<moviesArray.length; i++){
        let movieCard = document.createElement('div');
        movieList.appendChild(movieCard);
        movieCard.classList.add('movie-card');
        let movieImg = document.createElement('img');
        movieCard.appendChild(movieImg);
        if (moviesArray[i].poster_path === null){
            movieImg.src = 'img/no-movie-poster.png';
        }else{
            movieImg.src = `https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}`;
            movieImg.alt = moviesArray[i].title;
        }
        let movieTitle = document.createElement('h2');
        movieCard.appendChild(movieTitle);
        movieTitle.textContent = moviesArray[i].title;
        let viewDetailsBtn = document.createElement('button');
        movieCard.appendChild(viewDetailsBtn);
        viewDetailsBtn.textContent = 'View Details';
        viewDetailsBtn.id = `movie-${moviesArray[i].id}`;
        viewDetailsBtn.addEventListener('click', function(){
            fetchMovieDetails(moviesArray[i].id);
        });
    }
    windowText.textContent = 'Trending movies...';
    windowText.style.color = 'black';
}

// Fetch Search Results
function fetchSearchResults(){
    let searchValue = searchText.value;
    if(searchValue === ''){
        windowText.textContent = 'Please enter something in the field';
        windowText.style.color = 'red';
        return;
    }else{
        searchValue = searchValue.replaceAll(' ', '+');
    }
    const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(json => displaySearchResults(json));
}

// Display Search Results
function displaySearchResults(json){
    movieList.innerHTML = '';
    movieList.style = '';
    movieList.style.display = 'grid';
    movieList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(15em, 1fr))';
    movieList.style.gridGap = '1.2rem';
    movieList.style.marginTop = '1rem';
    mainWindow.style.padding = '2rem';
    const moviesArray = json.results;
    if (moviesArray.length === 0){
        windowText.textContent = 'No results found!';
        windowText.style.color = 'red';
        return;
    }
    for (let i=0; i<moviesArray.length; i++){
        let movieCard = document.createElement('div');
        movieList.appendChild(movieCard);
        movieCard.classList.add('movie-card');
        let movieImg = document.createElement('img');
        movieCard.appendChild(movieImg);
        if (moviesArray[i].poster_path === null){
            movieImg.src = 'img/no-movie-poster.png';
        }else{
            movieImg.src = `https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}`;
            movieImg.alt = moviesArray[i].title;
        }
        let movieTitle = document.createElement('h2');
        movieCard.appendChild(movieTitle);
        movieTitle.textContent = moviesArray[i].title;
        let viewDetailsBtn = document.createElement('button');
        movieCard.appendChild(viewDetailsBtn);
        viewDetailsBtn.textContent = 'View Details';

        viewDetailsBtn.id = `movie-${moviesArray[i].id}`;

        viewDetailsBtn.addEventListener('click', function(){
            fetchMovieDetails(moviesArray[i].id);
        });
    }
    let showSearch = searchText.value;
    windowText.textContent = `Search results for '${showSearch}'...`;
    windowText.style.color = 'black';
}

// Function to fetch Movie Details
function fetchMovieDetails(movieId){
    const url = `${baseUrl}movie/${movieId}?api_key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(json => displayMovieDetails(json));
}

// Function to display Movie Details
function displayMovieDetails(json){
    movieList.innerHTML = '';
    movieList.style = '';
    movieList.style.display = 'block';
    movieList.style.backgroundColor = '#f5f5f5';
    movieList.style.height = 'fit-content';
    movieList.style.border = '1px solid #cccccc';
    movieList.style.borderRadius = '8px';
    movieList.style.margin = '1rem';
    movieList.style.padding = '10px';
    movieList.style.padding = '0';
    movieList.style.margin = '0';
    movieList.style.paddingRight = '2rem';
    mainWindow.style.padding = '3rem';
    windowText.textContent = `Details for ${json.title}...`;
    let movieCard = document.createElement('div');
    movieList.appendChild(movieCard);
    movieCard.classList.add('single-movie-card');
    movieCard.style.display = 'flex';
    let movieImg = document.createElement('img');
    movieCard.appendChild(movieImg);
    if (json.poster_path === null){
        movieImg.src = 'img/no-movie-poster.png';
    }else{
        movieImg.src = `https://image.tmdb.org/t/p/w500${json.poster_path}`;
        movieImg.alt = json.title;
    }
    let textContainer = document.createElement('div');
    movieCard.appendChild(textContainer);
    textContainer.style.marginLeft = '1.5rem';
    let movieTitle = document.createElement('h2');
    textContainer.appendChild(movieTitle);
    movieTitle.textContent = json.title;
    let movieOverview = document.createElement('p');
    textContainer.appendChild(movieOverview);
    movieOverview.style.width = '60%';
    movieOverview.textContent = json.overview;
    let movieReleaseDate = document.createElement('p');
    textContainer.appendChild(movieReleaseDate);
    let [year, month, day] = json.release_date.split('-');
    let releaseDate = new Date(year, month - 1, day);
    let formattedDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    movieReleaseDate.textContent = `Release Date: ${formattedDate}`;
    let movieRating = document.createElement('p');
    textContainer.appendChild(movieRating);
    let formattedRating = json.vote_average.toFixed(1);
    movieRating.textContent = `Rating: ${formattedRating}`;
    if (json.vote_average < 5){
        movieRating.style.color = 'red';
    }else{
        movieRating.style.color = 'green';
    }
    movieRating.textContent += '/10';
    let movieRuntime = document.createElement('p');
    textContainer.appendChild(movieRuntime);
    let hours = Math.floor(json.runtime / 60);
    let minutes = json.runtime % 60;
    movieRuntime.textContent = `Runtime: ${hours} hours ${minutes} minutes`;
    let movieGenres = document.createElement('p');
    textContainer.appendChild(movieGenres);
    movieGenres.textContent = 'Genre(s): ';
    for (let i=0; i<json.genres.length; i++){
        movieGenres.textContent += `${json.genres[i].name}`;
        if (i !== json.genres.length - 1){
            movieGenres.textContent += ', ';
        }
    }
    let backBtn = document.createElement('button');
    textContainer.appendChild(backBtn);
    backBtn.textContent = 'Back';
    backBtn.addEventListener('click', function(){
        if (searchText.value !== ''){
            fetchSearchResults();
        }
        else{
            fetchTrendingMovies();
        }
    });
}

// Event Listeners
window.onload = function(){
    fetchTrendingMovies();
    displayTrendingMovies();
}
searchBtn.addEventListener('click', fetchSearchResults);