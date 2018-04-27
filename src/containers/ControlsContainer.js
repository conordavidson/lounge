import { connect } from 'react-redux'
import { nextMovie, previousMovie } from '../actions'
import { bindActionCreators } from 'redux'
import Controls from '../components/Controls'

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        nextMovie,
        previousMovie
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
