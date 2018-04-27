import { connect } from 'react-redux'
import Player from 'components/Player'
import currentMovie from 'state/selectors/currentMovie'

const mapStateToProps = state => {
  return {
    ...state.player,
    currentMovie: currentMovie(state)
  }
}

export default connect(mapStateToProps)(Player)
