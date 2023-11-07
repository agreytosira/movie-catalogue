/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable class-methods-use-this */
class FavoriteMovieSearchView {
  getTemplate() {
    return `
        <div id="movie-search-container">
          <input id="query" type="text">
   
          <div class="movie-result-container">
            <ul class="movies">
            </ul>
          </div>
        </div>
      `
  }

  getFavoriteMovieTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Liked Movie</h2>
        <div id="movies" class="movies">
        </div>
      </div>
    `
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showMovies(movies) {
    let html
    if (movies.length > 0) {
      html = movies.reduce(
        (carry, movie) =>
          carry.concat(`
            <li class="movie">
              <span class="movie__title">${movie.title || '-'}</span>
            </li>
          `),
        ''
      )
    } else {
      html = '<div class="movies__not__found">Film tidak ditemukan</div>'
    }

    document.querySelector('.movies').innerHTML = html

    document.getElementById('movie-search-container').dispatchEvent(new Event('movies:searched:updated'))
  }

  showFavoriteMovies(movies) {
    document.getElementById('movies').innerHTML = '<div class="movie-item__not__found"></div>'

    document.getElementById('movies').dispatchEvent(new Event('movies:updated'))
  }
}

export default FavoriteMovieSearchView
