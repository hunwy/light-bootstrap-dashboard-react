import Exchange from 'build/contracts/Exchange.json';
import axios from 'axios';
import {server_domain} from 'config';
const Buf = require('buffer/').Buffer ;
const EthereumTx = require('ethereumjs-tx');


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

  approveWithdraw(address,size,applyAddress,id){

  return new Promise((resolve, reject) => {
     console.log(Exchange.abi);
      var contract = new window.web3.eth.Contract(Exchange.abi,window.config.exchangeAddress);
      
      var dataobj  = contract.methods.approveWithdraw( id,applyAddress,size ,window.config.ppsAddress).encodeABI();
      
      window.web3.eth.getTransactionCount(window.address).then((txCount) =>{
                     
            var txData = {
                          nonce    : window.web3.utils.toHex(txCount),
                          gasLimit : window.web3.utils.toHex(153916),
                          gasPrice : window.web3.utils.toHex(parseInt(window.gas)*1000000000), // 10 Gwei
                          to       : window.config.exchangeAddress,
                          from     : window.address, 
                          data     : dataobj
                        }

            var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
            var transaction =new EthereumTx(txData);
            transaction.sign(pk);
            var serializedTx = transaction.serialize().toString('hex');

            var params = {};
            params.applyTransactionData   = '0x' + serializedTx;
            params.id                     = id;
            params.account                = address;
            params.size                   = size;
            params.applyAddress           = applyAddress;

           
            axios.post(server_domain+'/exchange/approveWithdraw', params)
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