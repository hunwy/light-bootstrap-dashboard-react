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
      Searchipt:"",
      Searchselect:"key",
    };
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

  keyUpdate(name,value){
    ConfigurationService.searchkey(name,value).then((data)=>{
      this.getConfigl();
    })
  }

  valueUpdate(name,value){
    ConfigurationService.searchvalue(name,value).then((data)=>{
      this.getConfigl();
    })
  }

  descriptionUpdate(name,value){
    ConfigurationService.searchdescription(name,value).then((data)=>{
      this.getConfigl();
    })
  }

  ConfigSearch(){
    let Searchipt = this.state.Searchipt.replace(/(^\s*)|(\s*$)/g, "");
    if(Searchipt){
      if(this.state.Searchselect == "key"){
        var ConfigurationArray = this.state.ConfigurationArray.filter(function (e) { 
          return e.key == Searchipt; 
        });
        this.setState({ConfigurationArray:ConfigurationArray})
      }
      if(this.state.Searchselect == "value"){
        var ConfigurationArray = this.state.ConfigurationArray.filter(function (e) { 
          return e.value == Searchipt; 
        });
        this.setState({ConfigurationArray:ConfigurationArray})
      }
      if(this.state.Searchselect == "description"){
        var ConfigurationArray = this.state.ConfigurationArray.filter(function (e) { 
          return e.description == Searchipt; 
        });
        this.setState({ConfigurationArray:ConfigurationArray})
      }
    }else{
      this.getConfigl() 
    }
  }

  Searchipt(e){
    this.setState({Searchipt:e})
    this.getConfigl();
  }

  Searchselect(e){
    this.setState({Searchselect:e})
    this.getConfigl();
  }

  Searchdel(){
    this.setState({Searchipt:""})
    this.getConfigl();
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
                        <input type="text" onChange={(e) => this.Searchipt(e.target.value)} value={this.state.Searchipt} />
                        <p onClick={(e)=>this.Searchdel()} className={this.state.Searchipt != "" ? "show" : "hide"}>x</p>
                        <button className="pe-7s-search" onClick={(e)=>this.ConfigSearch()}> </button> 
                      </div>  
                      <select onChange={(e) => this.Searchselect(e.target.value)}>
                        <option value ="key">名称</option>
                        <option value ="value">地址</option>
                        <option value="description">详情</option>
                      </select>
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
                            <td>
                              <EditableTextField 
                                name={prop.id} 
                                value={prop.key}
                                onUpdate={(name,value)=>this.keyUpdate(name,value)}
                                placeholder='Please input your username'/>
                            </td>
                            <td className="description">
                              <EditableTextField 
                                name={prop.id}  
                                value={prop.value}
                                onUpdate={(name,value)=>this.valueUpdate(name,value)}
                                placeholder='Please input your username'/>
                            </td>
                            <td className="description">
                              <EditableTextField 
                                name={prop.id}   
                                value={prop.description}
                                onUpdate={(name,value)=>this.descriptionUpdate(name,value)}
                                placeholder='Please input your username'/>
                            </td>
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
