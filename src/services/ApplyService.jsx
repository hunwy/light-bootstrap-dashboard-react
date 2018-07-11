import axios from 'axios';
import {server_domain} from 'config';

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

}

const applyService = new ApplyService()
export default applyService