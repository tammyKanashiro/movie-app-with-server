/* Search all movies by title */
export const searchMovies = async (title) => {
    const typeOp = document.querySelector('input[name="type"]:checked').id;
    let urlBase ='http://www.omdbapi.com/?apikey=61fbd7c1';

    urlBase += `&s=${title}`;

    if (typeOp !== 'any') {
        urlBase +=`&type=${typeOp}`;
    }
    
    const response = await fetch(urlBase);

    if (response.ok) {
        const data = response.json();

        return data;
    }
    
}

/* Search movie by title */
export const getMovieInfo = async (title) => {
    let urlBase ='http://www.omdbapi.com/?apikey=61fbd7c1';

    urlBase += `&t=${title}`;

    const response = await fetch(urlBase)

    if (response.ok) {
        const data = response.json();

        return data;
    }
}