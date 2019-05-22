
'use strict'

import {restAPI} from './RestApi'
import { GET} from './Constants'
import { API } from './Config'

class MovieFetchService {

    async fetchMovieListFromAPI(){
        let movieList = await restAPI.serviceCall(API.MOVIE_API, GET)
        console.log("movieList",movieList)
        let json = await movieList.json
        return json ? this.createMovieIdListMap(json.results) : {}
    }

    createMovieIdListMap(movieList){
        let movieIdListMap = {}
        for(let item in movieList){
            movieIdListMap[movieList[item].id] = movieList[item]
        }
        return movieIdListMap
    }

}
export let movieFetching = new MovieFetchService()
