import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Player from 'components/Player'
import currentMovie from 'state/selectors/currentMovie'
import currentPlayerView from 'state/selectors/currentPlayerView'
import { nextMovie } from 'state/actions'

const mapStateToProps = state => {
  return {
    currentPlayerView: currentPlayerView(state),
    currentMovie: currentMovie(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        nextMovie
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
