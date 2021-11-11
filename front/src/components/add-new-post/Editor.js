import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody, Form, FormInput, Button } from "shards-react";
import axios from 'axios';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

// const Editor = () => (
//   <Card small className="mb-3">
//     <CardBody>
//       <Form className="add-new-post">
//         <FormInput size="lg" className="mb-3" placeholder="문장 입력" onChange={e => this.onChange(e.target.value)} />
//         {/* <ReactQuill className="add-new-post__editor mb-1" /> */}
//         <Button theme="accent" size="sm" className="ml-auto" onClick={onClick}>
//             <i className="material-icons">file_copy</i> 분석
//           </Button>
//       </Form>
//     </CardBody>
//   </Card>
// );


class Editor extends React.Component{
  constructor(props){
    super(props);

    this.state ={      
      text : ""      
    }
  }

  onChange(e){
    this.setState({text : e})
  }

  render(){
    const getRepuScore = this.props.getRepuScore;
    const onClick =()=>{
      requestAPIServer(this.state.text)
    }
    const requestAPIServer = (text) => {
      axios({
        url: '/api/repu',
        method: 'post',
        data: {
          text: this.state.text
        }
      })
      .then(function(response){
        getRepuScore(response.data)
      }.bind(this))
      .catch(function(error){
        console.log(error)
      })
    }
    


    return(
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="문장 입력" onChange={e => this.onChange(e.target.value)} />
            {/* <ReactQuill className="add-new-post__editor mb-1" /> */}
            <Button theme="accent" size="sm" className="ml-auto" onClick={onClick}>
                <i className="material-icons">file_copy</i> 분석
              </Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}
export default Editor;
