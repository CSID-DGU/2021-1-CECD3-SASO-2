import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor_keyword from "../components/add-new-post/Editor_keyword";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SimilarSentense from "../components/add-new-post/SimilarSentense"
import SidebarCategories_keyword from "../components/add-new-post/SidebarCategories_keyword";


class Errors extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      generated_text : "문장을 생성해주세요..",
      cosin_List : []
    }
  }

  render() {
    const getGeneratedText = (text) => {
      this.setState({generated_text : text})
    }

    const getCosineSimilarity = (list)=>{
      this.setState({cosin_List : list})
    }

    return (
      <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="문장 생성" subtitle="SASO" className="text-sm-left" />
      </Row>
  
      <Row>
        {/* Editor */}
        <Col lg="12" md="12">
          <Editor_keyword getGeneratedText={getGeneratedText} getCosineSimilarity={getCosineSimilarity}/>
        </Col>
      </Row>
      <Row>
        {/* Sidebar Widgets */}
        <Col lg="12" md="12">
          {/* <SidebarActions /> */}
          <SidebarCategories_keyword generatedText={this.state.generated_text}/>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12">
          <SimilarSentense cosinList={this.state.cosin_List}/>
        </Col>
          {/* <SidebarActions /> */}
      </Row>
    </Container>
    )
  }
}

export default Errors;
