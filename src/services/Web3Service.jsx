import Web3 from 'web3';
import {reactLocalStorage} from 'reactjs-localstorage';

class Web3Service {
  static instance

  constructor() 
  {
    if (Web3Service.instance) {
      return Web3Service.instance
    }

    Web3Service.instance = this;  
  }

  clear(){
      window.address          = null;
      window.addressShow      = null;
      window.privateKey       = null;
      reactLocalStorage.setObject('wallet', null);
  }

  gas(gas){
     window.gas = gas;
     reactLocalStorage.setObject('gas', gas);
  }

  import(pk){

      console.log(window.web3.eth.accounts)
      var obj=window.web3.eth.accounts.wallet.add(pk);
      window.address          = obj.address;
      window.addressShow      = window.address.substring(0,10)+"...";
      window.privateKey       = pk;

      reactLocalStorage.setObject('wallet', 
          {
            'address': window.address,
          'privateKey': window.privateKey,
          'addressshow': window.addressshow});


  }



  loadWallet(){

    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(window.config.web3Provider));
      window.web3loaded = true;
    }

    if( !window.address )
    {
      var obj =reactLocalStorage.getObject('wallet');
      if(obj && obj.address && obj.privateKey)
      {
          window.address = obj.address;
          window.privateKey = obj.privateKey;
          window.addressshow = obj.address.substring(0,10)+"...";
          
      }
    }

     if( !window.gas )
    {


      var gas =reactLocalStorage.getObject('gas');
      console.log("########################gas#############",gas);
      if(gas)
      {
          window.gas = gas;
      }
    }
    
 }

}

  const web3Service = new Web3Service()
export default web3Service