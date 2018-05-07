import { connect } from 'react-redux'
import { nextMovie, queueBackward } from 'state/actions'
import { bindActionCreators } from 'redux'
import Controls from 'components/Controls'
import atFirstMovie from 'state/selectors/atFirstMovie'

const mapStateToProps = state => {
  return {
    ...state.player,
    atFirstMovie: atFirstMovie(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        nextMovie,
        queueBackward
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
