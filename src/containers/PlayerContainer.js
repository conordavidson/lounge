import { connect } from 'react-redux';
import { nextMovie, previousMovie, queryForMovies } from '../actions';
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
    queryForMovies: payload => {
      dispatch(queryForMovies(payload))
    }
  }
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)

export default PlayerContainer
