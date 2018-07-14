import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card";
import { thArray } from "variables/Variables";
import applyService from "services/ApplyService";
import Button from "components/CustomButton/CustomButton.jsx";

class TableList extends Component {
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

  approveWithdraw(account,size,applyAddress,id){
    applyService.approveWithdraw(account,size,applyAddress,id);
  }



  render() {
    return (
      <div className="content TableList">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="提币审核系统"
                category="基于智能合约的提币系统"
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
                            <td >{prop.applyAddress}</td>
                            <td >{prop.size}</td>
                            <td >{prop.transaction}</td>
                            <td><button onClick={(e)=>this.approveWithdraw(prop.account,prop.size,prop.applyAddress,prop.id)}>Approve</button><button>Rejected</button></td>

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

export default TableList;
