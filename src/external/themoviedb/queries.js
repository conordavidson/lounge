import THEMOVIEDB_KEY from './key'

export const urlBaseSegment = `https://api.themoviedb.org/3/`
export const urlKeyParam = `api_key=${THEMOVIEDB_KEY}`

export const fetchMovies = query => {
  const urlYearBeginParam = () => query.years.min ? `&primary_release_date.gte=${query.years.min}-01-01` : ``
  const urlYearEndParam = () => query.years.max ? `&primary_release_date.lte=${query.years.max}-01-01` : ``
  const urlGenreParam = () => query.genre ? `&with_genres=${query.genre}` : ``

  const urlSettingParams = `&language=en-US&sort_by=original_title.asc\
&include_adult=false&include_video=false\
&page=${parseInt((query.pageNumber).toString().substr(0, 3), 10)}\
${urlGenreParam()}${urlYearBeginParam()}${urlYearEndParam()}`

  return fetch(`${urlBaseSegment}discover/movie?${urlKeyParam}${urlSettingParams}`)
}

export const fetchDetails = query => {
  return fetch(`${urlBaseSegment}movie/${query.id}?${urlKeyParam}&append_to_response=videos,credits`)
}