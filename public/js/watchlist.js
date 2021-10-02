/* Get watchlist - localStorage */
export const getWatchlist = () => {
    const data = localStorage.getItem("watchlist");
    
    return JSON.parse(data);
}

/* Add/update watchlist - localstorage */
export const setWatchlist = (watchlistItems) => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistItems));
}