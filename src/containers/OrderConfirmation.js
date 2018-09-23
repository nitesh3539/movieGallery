import React, { PureComponent } from 'react'
import {
    View,
    Text,
    Image,
    Linking
} from 'react-native'
import styles from '../lib/FeStyle'
import TitleHeader from '../component/TitleHeader'
import { Button } from 'native-base'




export default class OrderConfirmation extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleHeader pageName={'Order Confirmation'} goBack={() => { navigation.goBack() }} />
        }
    }

    _footerButton() {
        return (
            <View style={[styles.bottomView, {marginBottom : 10}]}>
                <Button
                    full rounded success
                    onPress={() => this.directionView('delhi')}
                    style={{ marginTop: 15, marginLeft: 65, marginRight: 65 }}
                >
                    <Text style={[styles.fontWhite]}>GET DIRECTION</Text>
                </Button>
            </View>
        )
    }

    directionView = (data) => {
        var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${data}`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    _contentView() {
        return (
            <View style={[styles.alignCenter, styles.justifyCenter, { marginTop: 20 }]}>
                <Text style={{ color: '#000', alignItems: 'center', fontSize: 22, fontWeight: '600', marginTop: 10 }}> ORDER CONFIRMED</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, paddingLeft: 45, paddingRight: 45, paddingTop: 20 }}>{'Our driver is on his way to collect your order and will deliver it to your home shortly!'}</Text>
                <Image source={require('../images/mapView.png')} style={{ marginTop : 25 }} />                
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
