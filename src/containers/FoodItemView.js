/**
 * # Application.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 */
'use strict'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as globalActions from '../modules/GlobalAction'

import {
    StyleSheet,
    View,
    Image
}
    from 'react-native'

var styles = StyleSheet.create({
    container: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        marginTop: 80,
        padding: 10
    },
    summary: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

function mapStateToProps(state) {
    return {

    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...globalActions }, dispatch)
    }
}

class FoodItemView extends PureComponent {

    render() {
        return (
            <View>
                <Image
                    style={{width: '100%', height: '100%', resizeMode : 'cover'}}
                    source={require('../images/foodpanda_1.png')}
                />            
            </View>
        )
    }

}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(FoodItemView)