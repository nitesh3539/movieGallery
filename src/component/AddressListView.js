'use strict'

import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

const addressListView = (props) => {
    return props.addressData.map(function (data, i) {
        return (
            <View style={[{ width: 270, height: 40, backgroundColor: '#e4e4e4', marginTop: 25 }]}>
                <Text style={[{ fontFamily: 'serif', textAlign: 'center', marginTop: 8 }]}>
                    {data}
                </Text>
            </View>
        )
    })
}
export default addressListView