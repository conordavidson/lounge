import { connect } from 'react-redux';
import { setGenreAndQuery, setYearsAndQuery } from '../actions';
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
    setYearsAndQuery: payload => {
      dispatch(setYearsAndQuery(payload))
    }
  }
}

const QueryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Query)

export default QueryContainer
