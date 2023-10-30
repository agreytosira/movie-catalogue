import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator'
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb'

describe('Unliking A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
  }

  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteMovieIdb.putMovie({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteMovieIdb.deleteMovie(1)
  })

  it('should display unlike widget when the movie has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1
      }
    })

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy()
  })

  it('should not display like widget when the movie has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1
      }
    })

    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy()
  })

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: 1
      }
    })
    // Hapus dulu film dari daftar film yang disukai
    await FavoriteMovieIdb.deleteMovie(1)
    // Kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'))
    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([])
  })
})
