/* JavaScript Assignment - 4 | Deep Biswas - 200554124 */

// Adding Dynamic Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

const windowText = document.querySelector('.window-text');
const searchText = document.getElementById('searchText');
const searchBtn = document.getElementById('searchBtn');
const movieList = document.querySelector('.movies');


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
const apiKey = 'e4be2d8d86fbfd83ce907eca1f0262ab'
const baseUrl = 'https://api.themoviedb.org/3/'

// Fetch Trending Movies
function fetchTrendingMovies(){
    const url = `${baseUrl}movie/popular?language=en-US&page=1&api_key=${apiKey}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(json => displayTrendingMovies(json));
}

// Display Trending Movies
function displayTrendingMovies(json){
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
    }
    let showSearch = searchText.value;
    windowText.textContent = `Search results for '${showSearch}'...`;
    windowText.style.color = 'black';
}

// Event Listeners
window.onload = function(){
    fetchTrendingMovies();
    displayTrendingMovies();
}

searchBtn.addEventListener('click', fetchSearchResults);