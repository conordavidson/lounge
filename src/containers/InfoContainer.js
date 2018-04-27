import { connect } from 'react-redux'
import Info from 'components/Info'
import currentMovie from 'state/selectors/currentMovie'

const mapStateToProps = state => {
  return {
    ...state.player,
    currentMovie: currentMovie(state)
  }
}

export default connect(mapStateToProps)(Info)
