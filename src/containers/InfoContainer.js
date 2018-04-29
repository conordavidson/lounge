import { connect } from 'react-redux'
import Info from 'components/Info'
import currentMovie from 'state/selectors/currentMovie'
import currentPlayerView from 'state/selectors/currentPlayerView'

const mapStateToProps = state => {
  return {
    ...state.player,
    currentPlayerView: currentPlayerView(state),
    currentMovie: currentMovie(state)
  }
}

export default connect(mapStateToProps)(Info)
