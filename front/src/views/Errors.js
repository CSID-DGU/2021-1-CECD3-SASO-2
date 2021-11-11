import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor_keyword from "../components/add-new-post/Editor_keyword";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories_keyword from "../components/add-new-post/SidebarCategories_keyword";


class Errors extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      generated_text : "생기한의원",
      defalutList : [{ title : "생기한의원", value : ["ㅅㄱㅎㅇㅇ"]}]
    }
  }

  render() {

    const addKeywordList = (dic) => {
      this.setState({defalutList : [
        ...this.state.defalutList,
        dic]
      })
    }

    const changeDicValue = (value, key) => {
      const index = this.state.defalutList.findIndex(p => p.title == key);
      console.log(value, key, index)

      this.setState({defalutList : [
        ...this.state.defalutList.slice(0, index),
        {title:key, value:value},
        ...this.state.defalutList.slice(index+1)
      ]
      })
    }

    return (
      <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="키워드 입력" subtitle="SASO" className="text-sm-left" />
      </Row>
  
      
      <Row>
        {/* Sidebar Widgets */}
        <Col lg="12" md="12">
          {/* <SidebarActions /> */}
          <SidebarCategories_keyword addKeywordList={addKeywordList} defalutList={this.state.defalutList}/>
        </Col>
      </Row>
      <Row>
        {/* Editor */}
        <Col lg="12" md="12">
          <Editor_keyword defalutList={this.state.defalutList} changeDicValue={changeDicValue}/>
        </Col>
      </Row>
    </Container>
    )
  }
}

export default Errors;
