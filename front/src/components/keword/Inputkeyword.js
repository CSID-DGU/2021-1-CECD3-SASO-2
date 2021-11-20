import React from "react";
import { Card, CardBody, Form, FormInput, Button, FormSelect } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class Inputkeyword extends React.Component{
  constructor(props){
    super(props);

    this.state ={
      keyword : "",
      key : "생기한의원"
    }
  }
  onChange(e){
    this.setState({keyword: e})
  }

  onChangeKey(e){
    this.setState({key : e})
  }


  render(){
    const defaultList = this.props.defalutList
    const changeDicValue = this.props.changeDicValue
    const onClick = () => {
      changeDicValue(this.state.keyword, this.state.key)
      alert("키워드가 추가되었습니다.!!!")
    }


    return(
      <Card small className="mb-3">
        <CardBody>
          <Form className="add-new-post">
            <FormInput size="lg" className="mb-3" placeholder="키워드 입력" onChange={e => this.onChange(e.target.value)}/>
            <Button theme="accent" size="sm" className="ml-auto" onClick={onClick}>
              <i className="material-icons">file_copy</i> 키워드 추가
            </Button>

            <FormSelect
              size="sm"
              style={{ maxWidth: "130px" , marginLeft: '10px'}}
              onChange={e => this.onChangeKey(e.target.value)}>

              {defaultList && defaultList.map((item, idx)=>(
                <option value={item.title} key={idx}>{item.title}</option>
              ))}

            </FormSelect>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default Inputkeyword;
