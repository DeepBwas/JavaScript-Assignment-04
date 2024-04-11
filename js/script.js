/* JavaScript Assignment - 4 | Deep Biswas - 200554124 */
const windowText = document.querySelector('.window-text');
const searchText = document.getElementById('searchText');
const searchBtn = document.getElementById('searchBtn');
const movieList = document.querySelector('.movies');

// API Credentials
const apiKey = 'e4be2d8d86fbfd83ce907eca1f0262ab'
const baseUrl = 'https://api.themoviedb.org/3/'

function fetchTrendingMovies(){
    const url = `${baseUrl}movie/popular?language=en-US&page=1&api_key=${apiKey}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(json => displayTrendingMovies(json));
}

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
        }
        let movieTitle = document.createElement('h2');
        movieCard.appendChild(movieTitle);
        movieTitle.textContent = moviesArray[i].title;
        let viewDetailsBtn = document.createElement('button');
        movieCard.appendChild(viewDetailsBtn);
        viewDetailsBtn.textContent = 'View Details';
    }
    windowText.textContent = 'Search results...';
    windowText.style.color = 'black';
}

window.onload = function(){
    fetchTrendingMovies();
    displayTrendingMovies();
}

searchBtn.addEventListener('click', fetchSearchResults);