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


export default class DeliveryDetails extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleHeader pageName={'Delivery Details'} goBack={() => { navigation.goBack() }} />
        }
    }

    _footerButton() {
        return (
            <View style={[style.bottomView]}>
                <Button
                    full rounded success
                    onPress={this.paymentButtonPress}
                    style={{ marginTop: 15, marginLeft: 65, marginRight: 65 }}
                >
                    <Text style={[styles.fontWhite]}>PROCESS TO PAYMENT</Text>
                </Button>
            </View>
        )
    }

    paymentButtonPress = () => {
        navigate('PaymentDetails')
    }

    _contentView() {
        let addressData = ['Carrer De Petritxol 11', 'Barcelona', '08002', '9856355636']
        return (
            <View style={[styles.alignCenter, styles.justifyCenter, { marginTop: 30 }]}>
                <Image source={require('../images/per1.jpg')}
                    style={{ width: 120, height: 120, borderRadius: 120 / 2 }} />
                <View>
                    <View>
                        <Text style={[styles.fontWeight500, styles.fontXl, styles.fontBlack, { marginTop: 25, textAlign: 'center' }]}>
                            {'Home Address'}
                        </Text>
                    </View>
                    <AddressListView addressData={addressData} />
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
const style = StyleSheet.create({
    bottomView: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
})