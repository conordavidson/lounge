import { connect } from 'react-redux';
// import { queryMovie } from '../actions';
import Query from '../components/query';

const mapStateToProps = state => {
  return {
    ...state.player
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queryMovies: () => {
      // dispatch(queryMovies())
    }
  }
}

const QueryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Query)

export default QueryContainer
