"use strict";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as MovieDetailsActions from "../modules/movieDetails/MovieDetailsActions";
import { setState } from "../modules/GlobalAction";

import { bindActionCreators } from "redux";
import { API } from "../lib/Config";

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

var styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...MovieDetailsActions, setState }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    movieDetailsList: state.MovieDetailsReducer.movieDetailsList,
    loader: state.MovieDetailsReducer.loader
  };
}

class MovieListScreen extends PureComponent {
  componentDidMount() {
    this.props.actions.getMovieDetailsList();
  }

  state = {
    loadMore: 1
  };

  renderData(item) {
    return (
      <View style={{ marginBottom: 10 }}>
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              borderBottomColor: "#a4a4a4",
              borderBottomWidth: 1,
              padding: 15
            }
          ]}
        >
          <Text
            style={[{ fontSize: 16, color: "#e4e4e4", alignItems: "center" }]}
          >
            {item.title}
          </Text>
          <Text style={[{ fontSize: 14, marginBottom: 5, marginTop: 10 }]}>
            {item.overview}
          </Text>

          <Image
            style={{ width: "100%", height: 300 }}
            source={{ uri: `${API.IMAGE_API + item.poster_path}` }}
          />

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignContent: "space-around",
              flex: 1,
              marginTop: 10
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: item.isLike ? "#b8b8b8" : "#4286f4",
                paddingHorizontal: "19%",
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                borderRadius: 10
              }}
              onPress={() => {
                this.props.actions.changeMovieItemDetails(
                  item.id,
                  this.props.movieDetailsList,
                  true
                );
              }}
            >
              <Text
                style={{ color: "#e4e4e4", fontSize: 16, fontWeight: "bold" }}
              >
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: item.isLike == false ? "#b8b8b8" : "#4286f4",
                paddingHorizontal: "17%",
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: "#b8b8b8",
                borderRadius: 10
              }}
              onPress={() => {
                this.props.actions.changeMovieItemDetails(
                  item.id,
                  this.props.movieDetailsList,
                  false
                );
              }}
            >
              <Text
                style={{ color: "#e4e4e4", fontSize: 16, fontWeight: "bold" }}
              >
                Dislike
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _contentView(movieDetailsList) {
    movieDetailsList = movieDetailsList.sort(function(movie1, movie2) {
      return movie2.popularity - movie1.popularity;
    });
    let isShowLoadMore = 10 * this.state.loadMore < movieDetailsList.length;
    let moviesList = isShowLoadMore
      ? movieDetailsList.slice(0, 10 * this.state.loadMore)
      : movieDetailsList;
    return (
      <ScrollView
        style={{ marginBottom: 20, paddingLeft: 10, paddingRight: 10 }}
      >
        <FlatList
          data={moviesList}
          renderItem={item => this.renderData(item.item)}
          keyExtractor={item => String(item.id)}
        />

        {isShowLoadMore ? (
          <TouchableOpacity
            onPress={() => this.setState({ loadMore: this.state.loadMore + 1 })}
            style={{
              borderWidth: 2,
              borderColor: "#c3c3c3",
              marginLeft: "35%",
              marginRight: "35%",
              marginTop: 5,
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#a5a5a5"
              }}
            >
              Load More
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    );
  }
  render() {
    if (this.props.loader) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30%"
          }}
        >
          <ActivityIndicator size="large" color="#4286f4" />
        </View>
      );
    }
    return (
      <View
        style={{ height: "100%", backgroundColor: "#4286f4", marginTop: 10 }}
      >
        {this._contentView(Object.values(this.props.movieDetailsList))}
      </View>
    );
  }
}

/**
 * Connect the properties
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListScreen);
