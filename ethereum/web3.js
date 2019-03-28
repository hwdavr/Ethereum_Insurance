import Web3 from 'web3';
import {Platform} from 'react-native';
require('./config')

let web3;

if (global.gLocalTest) {
    // Test on a local ganache server  
    const providerURL = Platform.select({
        ios: 'http://localhost:7545',
        android: 'http://10.0.2.2:7545'
    });

    const provider = new Web3.providers.HttpProvider(
        providerURL
    );
    web3 = new Web3(provider);
} else {
    // On a server OR metamask is not running
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b035af3b15a7449788b306f5247aa07f'
    );
    web3 = new Web3(provider);
}

export default web3;
