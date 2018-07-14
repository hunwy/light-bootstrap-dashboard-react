import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Editable from 'react-x-editable';

import Card from "components/Card/Card";
import { ConfigurationthArray } from "variables/Variables";
import ConfigurationService from "services/ConfigurationService";
import Button from "components/CustomButton/CustomButton.jsx";

class Typography extends Component {

  constructor(props) {
      super(props)
    this.state={
      ConfigurationArray : []

    };
    if(!window.address)
    {
      window.location.href="/";
    }
  }

  componentWillMount(){
    
    ConfigurationService.getConfig().then((data)=>{
         this.setState({ConfigurationArray:data});        
    })
      
  }


  render() {
    return (
      <div className="content Configuration">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="配置文件"
                ctTableFullWidth
                ctTableResponsive
                content={
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
                            <td md={2} >{prop.id}</td>
                            <td md={1} >{prop.key}</td>
                            <td md={2} >{prop.description}</td>
                            <td md={2} >{prop.createdAt}</td>
                            <td><Button bsStyle="info" onClick={(e)=>this.approveWithdraw(prop.account,prop.size)}>Approve</Button><Button className="red" bsStyle="danger">Rejected</Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
            <Editable
               name="username"
               dataType="text"
               mode="popup"
               title="Please enter username"
             />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
