import { connect } from 'react-redux';
import { nextMovie, previousMovie, fetchMoviesAndTrailer } from '../actions';
import Player from '../components/player';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    nextMovie: () => {
      dispatch(nextMovie())
    },
    previousMovie: () => {
      dispatch(previousMovie())
    },
    fetchMoviesAndTrailer: () => {
      dispatch(fetchMoviesAndTrailer())
    }
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default PlayerContainer
