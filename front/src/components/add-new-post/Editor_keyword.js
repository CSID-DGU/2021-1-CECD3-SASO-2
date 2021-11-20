import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, Button, FormSelect } from "shards-react";
import axios from 'axios';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";


class Editor_keyword extends React.Component{
  constructor(props){
    super(props);

    this.state ={      
      keyword : "",
      type : "viral"
    }
  }
  onChange(e){
    if (e === "press"){
      this.setState({type:"press"})
    }else if (e === "viral"){
      this.setState({type:"viral"})
    }else{
      this.setState({keyword:e})
    }
  }
  
  
  render(){
    const getGeneratedText = this.props.getGeneratedText
    const getCosineSimilarity = this.props.getCosineSimilarity
    const onClick = () => {
      requestAPIServer(this.state.keyword, this.state.type)
    }

    const requestAPIServer =(keyword, type) => {
      axios
      .get("/api/gen", {
        params : {
          keyword:keyword,
          type: type
        }
      })
      .then(function(response) {
          getGeneratedText(response.data.generated_text)
          getCosineSimilarity(response.data.cosin)

      }.bind(this))  // <-- notice the .bind(this)
      .catch(function(error) {
          console.log(error);
      });  
    }
  

    return(
      <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          <FormInput size="lg" className="mb-3" placeholder="키워드 입력" onChange={e => this.onChange(e.target.value)}/>
          {/* <ReactQuill className="add-new-post__editor mb-1" /> */}
          <Button theme="accent" size="sm" className="ml-auto" onClick={onClick}>
              <i className="material-icons">file_copy</i> 생성
            </Button>
            <FormSelect
                  size="sm"        
                  style={{ maxWidth: "130px" , marginLeft: '10px'}}
                  onChange={e => this.onChange(e.target.value)}
                >
                  <option value="viral">바이럴</option>
                  <option value="press">언론보도</option>
                </FormSelect>  
        </Form>
      </CardBody>
    </Card>
    )
  }
}

export default Editor_keyword;
