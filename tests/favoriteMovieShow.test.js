/* eslint-disable no-trailing-spaces */
/* eslint-disable no-new */
import FavoriteMovieSearchView from '../src/scripts/views/pages/liked-movies/favorite-movie-search-view'
import FavoriteMovieShowPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-show-presenter'

describe('Showing all favorite movies', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteMovieSearchView()
    document.body.innerHTML = view.getFavoriteMovieTemplate()
  }
  beforeEach(() => {
    renderTemplate()
  })

  describe('When no movies have been liked', () => {
    it('should render the information that no movies have been liked', () => {
      const presenter = new FavoriteMovieShowPresenter({
        view
      })

      const movies = []
      presenter._displayMovies(movies)

      expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1)
    }),
      fit('should ask for the favorite movies', () => {
        const favoriteMovies = {
          getAllMovies: jest.fn()
        }

        new FavoriteMovieShowPresenter({
          view,
          favoriteMovies
        })

        expect(favoriteMovies.getAllMovies).toHaveBeenCalledTimes(1)
      })
  })
})
