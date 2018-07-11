import axios from 'axios';
import web3Service from 'services/Web3Service'
import {server_domain} from 'config';

class ConfigurationService {
  static instance

  getConfig(){
    return new Promise((resolve, reject) => {
        axios.get(server_domain+'/configuration')
        .then(function (response) {
        resolve(response.data);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        });
      });

  }

  constructor() 
  {
    if (ConfigurationService.instance) {
      return ConfigurationService.instance
    }

    ConfigurationService.instance = this;  
    
    this.getConfig().then((config)=>{
    console.log("###### init configuration ########",config);
    window.config ={};

    window.config.server_domain = server_domain;

    for(var i =0;i < config.length;i++)
    {

      //get web3 provider
      if(config[i].key ==='web3Provider')
      {
         window.config.web3Provider = config[i].value;
         web3Service.loadWallet();
         console.log('window.web3',window.web3);
      }


    }

    })


  
  }


}

const configurationService = new ConfigurationService();
export default configurationService