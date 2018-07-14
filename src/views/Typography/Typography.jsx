import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import {EditableTextField} from 'react-bootstrap-xeditable';
import Timestamp from 'react-timestamp';
import Modal from 'react-responsive-modal';

import Card from "components/Card/Card";
import { ConfigurationthArray } from "variables/Variables";
import ConfigurationService from "services/ConfigurationService";
import Button from "components/CustomButton/CustomButton.jsx";

class Typography extends Component {

  constructor(props) {
      super(props)
    this.state={
      open: false,
      ConfigurationArray : [],
      Configurationkey:"",
      Configurationvalue:"",
      Configurationdescription:"",
      disabledtrue:true,
      disabledfalse:false,
    };
    if(!window.address)
    {
      window.location.href="/";
    }
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount(){
    this.getConfigl() 
  }
  getConfigl(){
      ConfigurationService.getConfig().then((data)=>{
           this.setState({ConfigurationArray:data});        
      })
  }

  ConfigurationSubmit(){
    ConfigurationService.subConfig(this.state.Configurationkey,this.state.Configurationvalue,this.state.Configurationdescription).then((data)=>{
      this.onCloseModal();
      this.getConfigl();
    })
  }

  deleConfiguration(id){
    ConfigurationService.deleConfig(id).then((data)=>{
      this.getConfigl();
    })
  }

  handleUpdate(){

  }




  render() {
    return (
      <div className="content Configuration">
        <Grid fluid>
          <Row>
            <Col sm={12} md={12} >
              <Card
                title="配置文件"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <div className="ADDConfiguration">
                      <div>
                        <input type="text" />
                        <button className="pe-7s-search"> </button> 
                      </div>  
                    </div>
                  <Table striped hover>
                    <thead>
                      <tr>
                        {ConfigurationthArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ConfigurationArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.id}</td> 
                            
                            <td>
                              <EditableTextField 
                                name='username' 
                                value={prop.key}
                                onUpdate={this.handleUpdate}
                                placeholder='Please input your username'/>
                            </td>
                            <td className="description">
                              <EditableTextField 
                                name='username' 
                                value={prop.description}
                                onUpdate={this.handleUpdate}
                                placeholder='Please input your username'/>
                            </td>
                            <td>{(prop.createdAt.split("T"))[0]}</td>
                            <td><i className="pe-7s-trash" onClick={(e)=>this.deleConfiguration(prop.id)} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <button className="ADDBtn" onClick={this.onOpenModal}>添加配置文件</button>
                </div>  
                }
              />
            </Col>
          </Row>
        </Grid>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div className="ADDModal">
            <h3>填写配置信息</h3>
            <form>
              <p>名称</p>
              <input type="text" className="form-control" placeholder="请输入配置名称" value={this.state.Configurationkey} onChange={(e)=> this.setState({Configurationkey: e.target.value})} />
              <p>value</p>
              <input type="text" className="form-control" placeholder="请输入配置value" value={this.state.Configurationvalue} onChange={(e)=> this.setState({Configurationvalue: e.target.value})} />
              <p>详情</p>
              <textarea className="form-control" placeholder="请输入配置详情" value={this.state.Configurationdescription} onChange={(e)=> this.setState({Configurationdescription: e.target.value})}></textarea>
              <Button className={this.state.Configurationkey !="" && this.state.Configurationvalue !="" && this.state.Configurationdescription !="" ? "close" : "close closeActive"} disabled={this.state.Configurationkey !="" && this.state.Configurationvalue !="" && this.state.Configurationdescription !="" ? this.state.disabledfalse : this.state.disabledtrue} bsStyle="info" onClick={(e)=>this.ConfigurationSubmit()}>确&nbsp;&nbsp;定</Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Typography;
