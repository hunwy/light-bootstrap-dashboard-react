import PopulStayToken from 'build/contracts/PopulStayToken.json';
import Exchange from 'build/contracts/Exchange.json';
import axios from 'axios';
import {server_domain} from 'config';

const Buf = require('buffer/').Buffer ;
const EthereumTx = require('ethereumjs-tx');
var PPS_address = process.env.PPSAddress;
var exchange_address = process.env.Exchange_Contract;

class ApplyService {
  static instance

  constructor() 
  {
    if (ApplyService.instance) {
      return ApplyService.instance
    }

    ApplyService.instance = this;  
  }

  getApplyData(){
    return new Promise((resolve, reject) => {
        axios.get(server_domain+'/apply')
        .then(function (response) {
        console.log("response.data",response.data)
        resolve(response.data);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        });
      });

  }

  approve(size,txCount){
        var contract = new window.web3.eth.contract(PopulStayToken.abi,PPS_address);
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
        return '0x' + serializedTx;  
  }

  deposit(address,size){
    return new Promise((resolve, reject) => {
          var contract = new window.web3.eth.contract(Exchange.abi,exchange_address);
          var id       = window.web3.utils.randomHex(32);
          var dataobj  = contract.methods.deposit( id,address , size ,PPS_address).encodeABI();
          window.web3.eth.getTransactionCount(address).then((txCount) =>{

            var approveTransactionData = this.approve(size,txCount);
                     
            var txData = {
                          nonce    : window.web3.utils.toHex(txCount+1),
                          gasLimit : window.web3.utils.toHex(4476768),
                          gasPrice : window.web3.utils.toHex(window.gas), // 10 Gwei
                          to       : exchange_address,
                          from     : address, 
                          data     : dataobj
                        }

            var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
            var transaction =new EthereumTx(txData);
            transaction.sign(pk);
            var serializedTx = transaction.serialize().toString('hex');

            var params = {};
            params.approveTransactionData = approveTransactionData;
            params.depositTransactionData = '0x' + serializedTx;
            params.id                     = id;
            //params.balance                = size;
            params.account                = address;

            axios.post(process.env.Server_Address+'exchange/deposit', params)
            .then(function (response) {
            resolve(response);
            })
            .catch(function (error) {
            console.error(error)
            reject(error)
            });
                    
          });
      });
  }

}

const applyService = new ApplyService()
export default applyService