import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card";
import { thArray } from "variables/Variables";
import applyService from "services/ApplyService";
import Button from "components/CustomButton/CustomButton.jsx";

class Typography extends Component {

  constructor(props) {
      super(props)
      this.state={
        applyArray : []

      };
      if(!window.address)
      {
        window.location.href="/";
      }
    }

    componentWillMount(){
      
      applyService.getApplyData().then((applyData)=>{
           this.setState({applyArray:applyData});        
      })
        
    }

    approveWithdraw(account,size){
      applyService.approveWithdraw(account,size)
    }

  render() {
    return (
      <div className="content">
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
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.applyArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td >{prop.account}</td>
                            <td >{prop.size}</td>
                            <td >{prop.transaction}</td>
                            <td><Button bsStyle="info" onClick={(e)=>this.approveWithdraw(prop.account,prop.size)}>Approve</Button><Button className="red" bsStyle="danger">Rejected</Button></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default Typography;
