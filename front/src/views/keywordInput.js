import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
// import Inputkeyword from "../components/keyword/Inputkeyword";
// import OutPutkeyword from "../components/keyword/OutPutkeywords";

import Inputkeyword from "../components/keword/Inputkeyword";
import OutPutkeyword from "../components/keword/OutPutkeyword";


class Errors extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      generated_text : "신세계치과",
      defalutList : [{ title : "신세계치과", value : ["ㅅㅅㄱ치과"]}]
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
            <OutPutkeyword addKeywordList={addKeywordList} defalutList={this.state.defalutList}/>
          </Col>
        </Row>
        <Row>
          {/* Editor */}
          <Col lg="12" md="12">
            <Inputkeyword defalutList={this.state.defalutList} changeDicValue={changeDicValue}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Errors;
