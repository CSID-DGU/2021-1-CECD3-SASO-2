import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";

// const SidebarCategories = ({ title, generatedText }) => (
//   <Card small className="mb-3">
//     <CardHeader className="border-bottom">
//       <h5 className="m-0">{title}</h5>
//     </CardHeader>
//     <CardBody className="p-0">
//       <ListGroup flush>
//         <ListGroupItem className="px-3 pb-2">
//           <h6>{generatedText}</h6>
//         </ListGroupItem>

//         <ListGroupItem className="d-flex px-3">
//           <InputGroup className="ml-auto">
//             <FormInput placeholder="New category" />
//             <InputGroupAddon type="append">
//               <Button theme="white" className="px-2">
//                 <i className="material-icons">add</i>
//               </Button>
//             </InputGroupAddon>
//           </InputGroup>
//         </ListGroupItem>
        
//       </ListGroup>
//     </CardBody>
//   </Card>
// );

class SidebarCategories extends React.Component{
  constructor(props){
    super(props);

    this.state={
      keyword : "",
      keywordList : [],
      test : [
        {title : "생기한의원",
        value : ["ㅅㄱㅎㅇㅇ, ", "ㅇㄴㅁㄹ"]},
        {title : "삼성톡스앤필",
        value : "ㅅㅅㅌㅅㅇㅍ"}
      ]
    }
  }
  onChange(e){    
    this.setState({keyword : e})
  }

  
  render(){
    const defalutList = this.props.defalutList
    const addKeywordList = this.props.addKeywordList

    const onClick = () => {
      addKeywordList({title : this.state.keyword, value : ""})
      alert("등록되었습니다.!!!")
    }


    return(
      <Card small className="mb-3">
        <CardHeader className="border-bottom">
          <h5 className="m-0">{this.props.title}</h5>
        </CardHeader>
        <CardBody className="p-0">
          <ListGroup flush>
            
              {defalutList.map((item, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">
                  <span className="text-semibold text-fiord-blue">{item.title}</span>
                  <span className="ml-auto text-right text-semibold text-reagent-gray">
                    {item.value}
                  </span>
                </ListGroupItem>
              ))}
            
    
            <ListGroupItem className="d-flex px-3">
              <InputGroup className="ml-auto">
                <FormInput placeholder="정밀한 평판 분석을 원하는 키워드를 입력하세요"  onChange={e=> this.onChange(e.target.value)}/>
                <InputGroupAddon type="append">
                  <Button theme="white" className="px-2" onClick={onClick}>
                    <i className="material-icons">add</i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </ListGroupItem>
            
          </ListGroup>
        </CardBody>
      </Card>      
    )
  }
}

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  // title: "Categories"
  title: "키워드 등록"
};

export default SidebarCategories;
