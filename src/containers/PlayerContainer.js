import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Player from 'components/Player'
import currentMovie from 'state/selectors/currentMovie'
import currentPlayerView from 'state/selectors/currentPlayerView'
import {
  nextMovie,
  startControlDisplayTimeout,
  setYoutubePlayerInstance,
  togglePlayPause,
  detectTouchScreen
} from 'state/actions'

const mapStateToProps = state => {
  return {
    currentPlayerView: currentPlayerView(state),
    currentMovie: currentMovie(state),
    ...state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        nextMovie,
        startControlDisplayTimeout,
        setYoutubePlayerInstance,
        togglePlayPause,
        detectTouchScreen
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
