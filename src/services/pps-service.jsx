import PopulStayToken from '../../build/contracts/PopulStayToken.json';
import Exchange from '../../build/contracts/Exchange.json';
import Web3 from 'web3';
import axios from 'axios';
import md5 from 'md5';
const Buf = require('buffer/').Buffer ;
const EthereumTx = require('ethereumjs-tx');

var web_provider = process.env.WEB3_PROVIDER;
var PPS_address = process.env.PPSAddress;
var exchange_address = process.env.Exchange_Contract;
var Populstay_Wallet = process.env.Populstay_Wallet;
var fee = window.web3.utils.toWei(process.env.Withdraw_fee);

class PPSService {
  static instance

  constructor() 
  {
    if (PPSService.instance) {
      return PPSService.instance
    }

    PPSService.instance = this;

    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }
  }


  approve(size,txCount){
        var contract = new window.web3.eth.Contract(PopulStayToken.abi,PPS_address);
        var dataobj = contract.methods.approve( exchange_address , size ).encodeABI();
        
        var txData = {
                          nonce    : window.web3.utils.toHex(txCount),
                          gasLimit : window.web3.utils.toHex(4476768),
                          gasPrice : window.web3.utils.toHex(window.gas), // 10 Gwei
                          to       : PPS_address,
                          from     : window.address, 
                          data     : dataobj
                      }

        var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
        var transaction =new EthereumTx(txData);
        transaction.sign(pk);
        var serializedTx = transaction.serialize().toString('hex');
        console.log(123)
        return '0x' + serializedTx;  
  }


 }



  const ppsService = new PPSService()

export default ppsService