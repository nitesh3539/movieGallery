
'use strict'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as globalActions from '../modules/GlobalAction'

import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Text
} from 'react-native'
import { Button } from 'native-base'

import { SET_LOADER_FOR_ORDER_VIEW, SET_DATA_IN_CARTITEM_LIST, SET_DATA_IN_FOODITEM_LIST } from '../lib/Constants'
import styles from '../lib/FeStyle'
import TitleHeader from '../component/TitleHeader'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loader from '../component/Loader';
import { navigate } from '../lib/NavigationServices';


function mapStateToProps(state) {
    return {
        cartItemList: state.OrderViewReducer.cartItemList,
        loader: state.OrderViewReducer.loader
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    }
}

class OrderView extends PureComponent {
    componentDidMount() {
        this.setStateForCartItem()
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleHeader pageName={'Your Order'} goBack={() => { navigation.goBack() }} />
        }
    }

    setStateForCartItem() {
        this.props.actions.setState(SET_LOADER_FOR_ORDER_VIEW, true)
        let item = this.props.navigation.state.params.item
        let cartItemList = JSON.parse(JSON.stringify(this.props.cartItemList))
        console.log("params", this.props.navigation.state)
        cartItemList[item.itemId] = item
        this.props.actions.setState(SET_DATA_IN_CARTITEM_LIST, cartItemList)
    }

    setCountForFoodItem(cartItemData, itemId, incrementalValue) {
        let cartItemList = JSON.parse(JSON.stringify(cartItemData))
        let foodItemList = JSON.parse(JSON.stringify(this.props.navigation.state.params.foodItemData))
        if ((incrementalValue == -1 && cartItemList[itemId].count == 0)) {
            cartItemList[itemId].count = 0
        } else {
            cartItemList[itemId].count += incrementalValue
        }
        foodItemList[itemId] = cartItemList[itemId]
        this.props.actions.setState(SET_DATA_IN_FOODITEM_LIST, foodItemList)
        this.props.actions.setState(SET_DATA_IN_CARTITEM_LIST, cartItemList)
    }


    _itemCountView(item) {
        return (
            <View style={[styles.column, { marginRight: 30 }]}>
                <TouchableOpacity onPress={() => { this.setCountForFoodItem(this.props.cartItemList, item.itemId, -1) }}>
                    <MaterialIcons name={"remove"} style={[styles.fontBlack, styles.fontXl, { textAlign: 'center' }]} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>{item.count ? item.count : 0}</Text>
                <TouchableOpacity onPress={() => { this.setCountForFoodItem(this.props.cartItemList, item.itemId, 1) }}>
                    <MaterialIcons name={"add"} style={[styles.fontBlack, styles.fontXl, styles.fontLeft, { textAlign: 'center' }]} />
                </TouchableOpacity>
            </View>
        )
    }

    renderData(item) {
        const itemCount = this._itemCountView(item)
        return (
            <View style={[style.seqCardDetail, styles.row]}>
                <Image
                    style={[{ width: 80, height: 80, resizeMode: 'cover' }]}
                    source={{ uri: item.url }}
                />
                <View style={{ marginRight: 50 }}>
                    <Text style={[styles.fontWeight500, styles.fontXl, { fontSize: 14, marginTop: 15 }]}>
                        {item.name}
                    </Text>
                    <Text style={[styles.fontXl, { fontFamily: 'serif', color: '#008000' }]}>
                        {`$${item.price}`}
                    </Text>
                </View>
                {itemCount}
            </View>
        )
    }

    _calculateAmount(data) {
        let amount = 0
        for (let id in data) {
            amount += data[id].price
        }
        return amount
    }
    processButtonPress = () => {
        navigate('DeliveryDetails')
    }
    _footerButton(data) {
        const totalAmount = this._calculateAmount(data)
        return (
            <View style={[style.bottomView]}>
                <Text>{`TOTAL:$${totalAmount}`}</Text>
                <Button
                    full rounded success
                    disabled={!data.length}
                    onPress={this.processButtonPress}
                    style={{ marginTop: 15, marginLeft: 35, marginRight: 35 }}
                >
                    <Text style={[styles.fontWhite]}>PROCESS ORDER</Text>
                </Button>
            </View>
        )
    }

    render() {
        console.log("this.props", this.props)
        if (this.props.loader) {
            return <Loader />
        } else {
            const renderData = Object.values(this.props.cartItemList)
            const footerView = this._footerButton(renderData)
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <FlatList
                        data={renderData}
                        renderItem={(item) => this.renderData(item.item)}
                        keyExtractor={(item) => String(item.itemId)} />
                    {footerView}
                </View>
            )
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
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomView: {
        width: '100%',
        height: 100,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(OrderView)