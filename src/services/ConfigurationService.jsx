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

  subConfig(key,value,description){
    return new Promise((resolve, reject) => {
        var params = {};
        params.key              = key;
        params.value            = value;
        params.description      = description;

        axios.post(server_domain+'/configuration',params)
        .then(function (response) {
        resolve(response);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        }); 
      });
  }

  deleConfig(id){
    return new Promise((resolve, reject) => {
        axios.delete(server_domain+'/configuration/'+id)
        .then(function (response) {
        resolve(response);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        }); 
      });
  }

  searchkey(name,value){
    return new Promise((resolve, reject) => {

        var params = {};
        params.id              = name;
        params.key            = value;

        axios.post(server_domain+'/configuration/update',params)
        .then(function (response) {
        resolve(response);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        }); 
      });
  }
  searchvalue(name,value){
    return new Promise((resolve, reject) => {

        var params = {};
        params.id              = name;
        params.value            = value;

        axios.post(server_domain+'/configuration/update',params)
        .then(function (response) {
        resolve(response);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        }); 
      });
  }

  searchdescription(name,value){
    return new Promise((resolve, reject) => {

        var params = {};
        params.id              = name;
        params.description            = value;

        axios.post(server_domain+'/configuration/update',params)
        .then(function (response) {
        resolve(response);
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

      //get exchange address
      if(config[i].key ==='exchangeAddress')
      {
         window.config.exchangeAddress = config[i].value;
      }

      //get pps address
      if(config[i].key ==='ppsAddress')
      {
         window.config.ppsAddress = config[i].value;
      }

      //get etherscan url
      if(config[i].key ==='etherscan')
      {
         window.config.etherscan = config[i].value;
      }


    }

    })


  
  }


}

const configurationService = new ConfigurationService();
export default configurationService