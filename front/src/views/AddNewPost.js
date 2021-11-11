import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";


class AddNewPost extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      reputation_score : {"pos":0.0, "neg":0.0}
    }
  }

  render(){
    const getRepuScore = (score) => {
      this.setState({reputation_score: score})
    }
    return(
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="긍부정 문장 분석" subtitle="SASO" className="text-sm-left" />
        </Row>
    
        <Row>
          {/* Editor */}
          <Col lg="12" md="12">
            <Editor getRepuScore={getRepuScore}/>
          </Col>
        </Row>
        <Row>
          {/* Sidebar Widgets */}
          <Col lg="12" md="12">
            {/* <SidebarActions /> */}
            <SidebarCategories repuScore={this.state.reputation_score}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddNewPost;