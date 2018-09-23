import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Body, Header, Icon } from 'native-base'
import styles from '../lib/FeStyle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const TitleHeader = (props) => {
    return (
        <Header searchBar style={[{ backgroundColor: '#008000' }, styles.header]}>
            <Body>
                <View
                    style={[styles.row, styles.width100, styles.justifySpaceBetween]}>
                    <View style={[styles.headerLeft]}>
                        {(props.pageName != 'WayBack Burger') ? <TouchableOpacity style={[]} onPress={() => props.goBack(null)}>
                            <MaterialIcons name={"arrow-back"} style={[styles.fontWhite, styles.fontXl, styles.fontLeft]} />
                        </TouchableOpacity> : null}
                    </View>
                    <View style={[styles.headerBody]}>
                        <Text style={[styles.fontCenter, styles.fontWhite, styles.fontLg, styles.alignCenter]}>{props.pageName}</Text>
                    </View>
                    <View style={[styles.headerRight]}>
                        {((props.pageName != 'WayBack Burger')) ? <MaterialIcons name={"shopping-cart"} style={[styles.fontWhite, styles.fontXl]} /> : null}
                    </View>
                </View>
            </Body>
        </Header>
    )
}

export default TitleHeader