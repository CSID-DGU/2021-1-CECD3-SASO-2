import React, { useContext, createContext } from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";
import axios from 'axios';

import Context from "../../../context/index";

class NavbarSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      analysisResult: {},
      keyword : ""
    }

  }
  static contextType = Context;
  
  onChange(e){
    this.setState({
      keyword: e
    })
  }
  
  render(){
    const { totalData, setData } = this.context
    
    const f1 = () => {
      axios
      .get("/analysis", {
        params : {
          keyword:this.state.keyword
        }
      })
      .then(function(response) {
          this.setState({analysisResult : response.data}, function() {
            // const responseData = this.state.analysisResult.totalPosNeg
            const responseData = this.state.analysisResult
            setData(responseData)
          });

      }.bind(this))  // <-- notice the .bind(this)
      .catch(function(error) {
          console.log(error);
      });
    }

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        f1()     
      }
    }

    return(
      <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
        <InputGroup seamless className="ml-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder="키워드 입력를 입력하세요"
            onChange = {e => this.onChange(e.target.value)}
            onKeyPress ={onKeyPress}       
          />
        </InputGroup>
      </Form>
    )
  }
}

export default NavbarSearch;

