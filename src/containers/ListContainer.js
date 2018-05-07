import { connect } from 'react-redux'
import { saveMovie, deleteMovie } from 'state/actions'
import { bindActionCreators } from 'redux'
import currentMovie from 'state/selectors/currentMovie'
import List from 'components/List'

const mapStateToProps = state => {
  return {
    ...state.list,
    currentMovie: currentMovie(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        saveMovie,
        deleteMovie
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
