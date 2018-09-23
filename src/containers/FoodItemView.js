/**
 * # FoodItemView.js
 *  Display startup screen and
 *  navigate to FoodItemView
 */
"use strict";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as globalActions from "../modules/GlobalAction";

import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { Content, Button } from "native-base";

import { SET_DATA_IN_FOODITEM_LIST } from "../lib/Constants";
import foodItemJson from "../jsonData/FoodItemJsonData";
import styles from "../lib/FeStyle";
import TitleHeader from "../component/TitleHeader";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import _ from "lodash";
import { navigate } from "../lib/NavigationServices";

function mapStateToProps(state) {
  return {
    foodItemList: state.FoodItemReducer.foodItemList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...globalActions }, dispatch)
  };
}

class FoodItemView extends PureComponent {
  componentDidMount() {
    let foodItemdata = _.keyBy(foodItemJson, "itemId");
    setTimeout(() => {
      this.props.actions.setState(SET_DATA_IN_FOODITEM_LIST, foodItemdata);
    }, 1000);
  }
  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  setCountForFoodItem(foodItemList, itemId, incrementalValue) {
    let foodItemData = JSON.parse(JSON.stringify(foodItemList));
    if (incrementalValue == -1 && foodItemData[itemId].count == 0) {
      foodItemData[itemId].count = 0;
    } else {
      foodItemData[itemId].count += incrementalValue;
    }
    this.props.actions.setState(SET_DATA_IN_FOODITEM_LIST, foodItemData);
  }

  _itemCountView(item) {
    return (
      <View style={[styles.row]}>
        <TouchableOpacity
          onPress={() => {
            this.setCountForFoodItem(this.props.foodItemList, item.itemId, -1);
          }}
        >
          <MaterialIcons
            name={"remove"}
            style={[
              styles.fontBlack,
              styles.fontXl,
              styles.fontLeft,
              { paddingRight: 50 }
            ]}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginBottom: 30, fontWeight: "bold" }}>
          {item.count ? item.count : 0}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.setCountForFoodItem(this.props.foodItemList, item.itemId, 1);
          }}
        >
          <MaterialIcons
            name={"add"}
            style={[
              styles.fontBlack,
              styles.fontXl,
              styles.fontLeft,
              { paddingLeft: 50 }
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  cartButtonPress(item) {
    navigate("OrderView", { item, foodItemData: this.props.foodItemList });
  }

  _itemButtonView(item) {
    return (
      <Button
        full
        rounded
        success
        disabled={!item.count}
        onPress={() => this.cartButtonPress(item)}
        style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}
      >
        <Text style={[styles.fontWhite]}>ADD TO CART</Text>
      </Button>
    );
  }

  renderData(item) {
    const itemCount = this._itemCountView(item);
    const buttonView = this._itemButtonView(item);
    return (
      <View style={style.seqCardDetail}>
        <View style={[styles.justifyCenter, styles.alignCenter]}>
          <Image
            style={[{ width: 180, height: 180, resizeMode: "cover" }]}
            source={{ uri: item.url }}
          />
          <Text
            style={[
              styles.fontWeight500,
              styles.lineHeight25,
              { color: "#008000", marginTop: 20, fontSize: 24 }
            ]}
          >
            {`$${item.price}`}
          </Text>
          <Text
            style={[
              styles.fontXl,
              styles.fontWeight300,
              styles.lineHeight20,
              { padding: 30, fontFamily: "serif", textAlign: "center" }
            ]}
          >
            {item.title}
          </Text>
          {itemCount}
          {buttonView}
        </View>
      </View>
    );
  }

  render() {
    if (this.props.foodItemList.length == 0) {
      return (
        <View>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={require("../images/foodpanda_1.png")}
          />
        </View>
      );
    } else {
      return (
        <Content style={{ backgroundColor: "#fff" }}>
          <TitleHeader
            pageName={"WayBack Burger"}
            goBack={() => this.props.navigation.goBack(null)}
          />
          <FlatList
            data={Object.values(this.props.foodItemList)}
            renderItem={item => this.renderData(item.item)}
            keyExtractor={item => String(item.itemId)}
          />
        </Content>
      );
    }
  }
}

const style = StyleSheet.create({
  seqCardDetail: {
    flex: 1,
    minHeight: 70,
    paddingTop: 10,
    paddingBottom: 20,
    marginLeft: 15,
    borderBottomColor: "#e4e4e4",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

/**
 * Connect the properties
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodItemView);
