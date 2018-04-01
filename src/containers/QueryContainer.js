import { connect } from 'react-redux';
import { setGenreAndQuery, setYearAndQuery } from '../actions';
import Query from '../components/query';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGenreAndQuery: payload => {
      dispatch(setGenreAndQuery(payload))
    },
    setYearAndQuery: payload => {
      dispatch(setYearAndQuery(payload))
    }
  }
}

const QueryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Query)

export default QueryContainer
