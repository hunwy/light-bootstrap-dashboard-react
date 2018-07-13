import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import web3Service from "services/Web3Service";

class UserProfile extends Component {

   constructor(props) {
    super(props);
    this.state = {
      open: false,
      gasopen:false,
      privatekey:'',
      gas:''
    };
    if(!window.address)
    {
    }
  }
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenGasModal = () => {
    this.setState({ gasopen: true });
  };
 
  onCloseGasModal = () => {
    this.setState({ gasopen: false });
  };

  import = () => {
    this.onCloseModal();
    web3Service.import('0x'+this.state.privatekey);
  };

  clear = () => {
    web3Service.clear();
  };

  gas = () => {
    this.onCloseGasModal();
    web3Service.gas(this.state.gas);
  };





  render() {
    return (
    <div className="content UserProfile">
        <Grid fluid>
            <Row>
                <Col md={12}>
                <Card title="公司钱包设置" content={ 
                  <form>
                    <Row>
                    <Col md={10}>
                    <h5>钱包地址</h5>
                    <input type="text" className="form-control" placeholder="钱包地址" readOnly value={window.address} />
                    </Col>

                    <Col md={2}>
                    <h5 className="Gas">Gas Price</h5>
                    <input type="number" className="form-control" placeholder="Gas Price"  defaultValue={window.gas} />
                    </Col>
                    </Row>
                    
                    <Row>
                        <Col sm={3} md={2} lg={2}>
                        <Button bsStyle="info" onClick={this.onOpenModal}>
                            导入钱包
                        </Button>
                        </Col>
                        <Col sm={3} md={2} lg={2}>
                        <Button bsStyle="info" onClick={this.onOpenGasModal}>
                            设定Gas
                        </Button>
                        </Col>
                        <Col sm={3} md={2}  lg={2}>
                        <Button bsStyle="info" className="clear"
                        onClick={this.clear}>
                            清空账号
                        </Button>
                        </Col>
                    </Row>
                    <div className="clearfix" />
                      </form>
                    } />
              </Col>
            </Row>
        </Grid>
    <div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <h4>Private Key</h4>
            <input type="text" className="form-control" placeholder="请输入私钥" onChange={(e)=> this.setState({privatekey: e.target.value})} />
            <Button className="close" bsStyle="info" onClick={this.import}>导入</Button>
        </Modal>
    </div>

    <div>
        <Modal open={this.state.gasopen} onClose={this.onCloseGasModal} center>
            <h4>Gas Price</h4>
            <input type="number" className="form-control" placeholder="请输入Gas Price" onChange={(e)=> this.setState({gas: e.target.value})} />
            <Button className="close" bsStyle="info" onClick={this.gas}>确定</Button>
        </Modal>
    </div>
    </div>
    );
  }
}

export default UserProfile;
