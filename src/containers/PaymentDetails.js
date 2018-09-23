import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import styles from '../lib/FeStyle'
import TitleHeader from '../component/TitleHeader'
import { Button } from 'native-base'
import { navigate } from '../lib/NavigationServices';
import AddressListView from '../component/AddressListView'



export default class PaymentDetails extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleHeader pageName={'Payment Details'} goBack={() => { navigation.goBack() }} />
        }
    }

    _footerButton() {
        return (
            <View style={[styles.bottomView]}>
                <Button
                    full rounded success
                    onPress={this.processButtonPress}
                    style={{ marginTop: 15, marginLeft: 65, marginRight: 65 }}
                >
                    <Text style={[styles.fontWhite]}>PAY ORDER</Text>
                </Button>
            </View>
        )
    }

    processButtonPress = () => {
        navigate('OrderConfirmation')
    }

    _contentView() {
        let addressData = ['Mario Javier Jubina', '1234 5673 4554 5455', '08/22', '123']
        return (
            <View style={[styles.alignCenter, styles.justifyCenter, { marginTop: 10 }]}>
                <Image source={require('../images/debit_card.png')}
                    style={{ width: '90%', height: '39%', }} />
                <View>
                <AddressListView addressData = {addressData}/>
                </View>
            </View>
        )
    }

    render() {
        const footerView = this._footerButton()
        const contentView = this._contentView()
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {contentView}
                {footerView}
            </View>
        )
    }
}