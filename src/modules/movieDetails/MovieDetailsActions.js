import { SET_LOADER, SET_MOVIE_DETAILS_LIST } from "../../lib/Constants";
import { movieFetching } from "../../lib/MovieFetchServices";
import { setState } from "../GlobalAction";

export function getMovieDetailsList() {
  return async function(dispatch) {
    try {
      dispatch(setState(SET_LOADER, true));
      let movieList = await movieFetching.fetchMovieListFromAPI();
      dispatch(setState(SET_MOVIE_DETAILS_LIST, movieList));
    } catch (error) {
      console.log("error", error.message);
    }
  };
}

export function changeMovieItemDetails(id, movieList, isLike) {
  return async function(dispatch) {
    try {
      dispatch(setState(SET_LOADER, true));
      let cloneMovieList = JSON.parse(JSON.stringify(movieList));
      if (cloneMovieList && cloneMovieList[id]) {
        cloneMovieList[id].isLike = isLike;
      }
      dispatch(setState(SET_MOVIE_DETAILS_LIST, cloneMovieList));
    } catch (error) {
      console.log("error", error.message);
    }
  };
}
