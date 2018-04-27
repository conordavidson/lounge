import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setGenreAndQuery, setYearsAndQuery } from '../actions'
import Query from '../components/Query'

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setGenreAndQuery,
        setYearsAndQuery
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Query)
