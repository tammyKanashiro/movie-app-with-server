import { getWatchlist, setWatchlist } from './watchlist.js';
import { searchMovies, getMovieInfo } from './search.js'

/* Search bar */
const form = document.getElementById('form');
const searchBar = document.getElementById('searchBar');

/* Search result list */
const movieList = document.getElementsByClassName('movie-list');

/* Movie information body */
const bodyInfo = document.getElementsByClassName('info-wrapper');
const bodyDesc = document.getElementsByClassName('description');
const bodyRating = document.getElementsByClassName('rating-section');

/* Watchlist */
const watchlist = document.getElementsByClassName('watchlist');
let watchlistSaved = [];

/* Watchlist - add/remove movie from watchlist */
watchlist[0].querySelector('.watchlist-link').addEventListener('click', e => {
    e.preventDefault();

    const movieId = watchlist[0].id;
    const data = getWatchlist();

    if (data !== null) {
        const hasItem = data.indexOf(movieId);

        if (hasItem >= 0) {
            data.splice(data.indexOf(movieId), 1);
            watchlist[0].classList.remove('has-item');
        } else {
            data.push(movieId);
            watchlist[0].classList.add('has-item');
        }

        watchlistSaved = data;

    } else {
        watchlistSaved.push(movieId);
    }

    setWatchlist(watchlistSaved);

    console.log('watchlist localstorage', getWatchlist())
});

/* Add movies found to movies list */
const showMovies = (results) => {
    const movieQty = document.getElementById('movies-qty');
    
    movieList[0].innerHTML = '';

    if (results.Response === 'True') {
        movieQty.children[0].textContent  = results.Search.length;

        (results.Search).forEach((item, id) => {
            let li = document.createElement("li");
            li.classList.add('movieItem');

            if (id === 0) {
                li.classList.add('is-selected');
                const data = getMovieInfo(item.Title);

                data.then(res => {
                    // console.log('res', res);
                    showMovieDesc(res);
                }).catch(err => {
                    console.log('err', err);
                });
            } 

            li.innerHTML = `
                <img src=${item.Poster}>
                <div>
                    <p class="movie-title">${item.Title}</p>
                    <p class="movie-year">${item.Year}</p>
                    <a class="movieItem-link"></a>
                </div>
            `

            li.querySelector('.movieItem-link').addEventListener('click', e => {
                const itemList = document.getElementsByClassName('movieItem');
                if (itemList.length > 0) {
                    for (let i = 0; i < itemList.length; i++) {
                        itemList[i].classList.remove('is-selected');
                    };
                }

                e.target.parentElement.parentElement.classList.add('is-selected');
                const title = e.target.parentElement.querySelector('.movie-title').textContent;

                const data = getMovieInfo(title);

                data.then(res => {
                    // console.log('res', res);
                    showMovieDesc(res);
                }).catch(err => {
                    console.log('err', err);
                });
                
            });

            movieList[0].appendChild(li);
        });
    } else {
        console.log(results.Error);
        movieQty.children[0].textContent  = 'No';
        bodyInfo[0].classList.remove('is-open');
        bodyDesc[0].classList.remove('is-open');
        bodyRating[0].classList.remove('is-open');
    }
}

/* Display selected movie information */
const showMovieDesc = (result) => {
    bodyInfo[0].classList.add('is-open');
    bodyDesc[0].classList.add('is-open');
    bodyRating[0].classList.add('is-open');

    const moviePoster  = document.getElementById('info-img');
    const movieTitle = document.getElementById('info-title');
    const movieRated = document.getElementById('rated');
    const movieYear = document.getElementById('year');
    const movieGenre = document.getElementById('genre');
    const movieDuration = document.getElementById('duration');
    const movieActors = document.getElementById('actors');

    const movieDesc = document.getElementById('movie-desc');

    const movieImd = document.getElementById('rating-imd');
    const movieRt = document.getElementById('rating-rt');
    const movieM = document.getElementById('rating-m');

    if (result) {
        const data = getWatchlist();

        if (data !== null) {
            const hasItem = data.indexOf(result.imdbID);
        
            if (hasItem >= 0) {
                watchlist[0].classList.add('has-item');
            } else {
                watchlist[0].classList.remove('has-item');
            }
        } 

        watchlist[0].id = result.imdbID;
        moviePoster.src = result.Poster;
        movieTitle.textContent = result.Title;
        movieRated.textContent = result.Rated;
        movieYear.textContent = result.Year;
        movieGenre.textContent = result.Genre;
        movieDuration.textContent = result.Runtime;
        movieActors.textContent = result.Actors;

        movieDesc.textContent = result.Plot;

        movieImd.textContent = result.Ratings[0].Value;

        if (result.Ratings[1]) {
            movieRt.textContent = result.Ratings[1].Value;
        }

        if (result.Ratings[2]) {
            movieM.textContent = result.Ratings[2].Value;
        }
    }
}

/* Search bar */
form.addEventListener('submit', e => {
    e.preventDefault();

    let searchText = searchBar.value;

    if (searchText) {
        searchText = searchText.replace(/\s+/g, '+');

        const data = searchMovies(searchText);

        data.then(res => {
            showMovies(res);
        }).catch(err => {
            console.log('err', err);
        });
    }
});
