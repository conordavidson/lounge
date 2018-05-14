import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setQuery } from 'state/actions'
import Query from 'components/Query'

const mapStateToProps = state => {
  return {
    ...state.player,
    ...state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setQuery
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Query)
