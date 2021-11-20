import React from "react";
import PropTypes from "prop-types";
import {
  Container, Row, Col, Card, CardHeader, ListGroup, CardBody, Button, Form,
  ListGroupItem
} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import OverRoll from "./../components/common/OverRoll";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";

import Checkboxes from "../components/components-overview/Checkboxes";
import RadioButtons from "../components/components-overview/RadioButtons";
import ToggleButtons from "../components/components-overview/ToggleButtons";
import ButtonGroups from "../components/components-overview/ButtonGroups";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";

import Context from "../context/index"



class BlogOverview extends React.Component{
  static contextType = Context
  constructor(props){
    super(props);

    this.state={
      pastContext : {},
      chardatalist : this.props.smallStats,
      reviewAnalysis : {mostReviewDomain : "",
                        increaseReviewDomain: "",
                        decreaseReviewDomain: "",
                        totalValue: ""}
    }

  }

  componentDidMount(){
    this.setState({pastContext: this.context.totalData.domainReviewCount})
  }

  componentDidUpdate(){
    if(this.state.pastContext !== this.context.totalData.domainReviewCount){
      const domain = this.context.totalData.domainReviewCount
      const stateDomain = this.state.chardatalist

      for(var i = 0; i< 4; i++){
        stateDomain[i].value = domain[i].value
        if(domain[i].percentage === '0'){
          domain[i].percentage = '최근 리뷰가 없습니다.'
        }
        stateDomain[i].percentage = domain[i].percentage
        stateDomain[i].increase = domain[i].increase
        stateDomain[i].datasets.data = domain[i].data
      }
      this.setState({reviewAnalysis : domain[4]})

      this.setState({pastContext: this.context.totalData.domainReviewCount})
    }
  }

  render(){


    return(
      <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle title="평판 관리 분석 툴" subtitle="SASO" className="text-sm-left mb-3" />
      </Row>

      {/* Small Stats Blocks */}
      <Row>
      {this.state.chardatalist.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      <Col lg="6" className="mb-4">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">사용자 설정</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-0 px-3 pt-2">
              <Row>
                <ToggleButtons />
                <Checkboxes />
                {/* <RadioButtons /> */}
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>

      <Col lg="6" className="mb-4">
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">전체 채널 현황 분석</h6>
          </CardHeader>
          <ListGroup flush>
            {/* px : 왼쪽으로부터 term, pt : 위에서부터 term */}
            <ListGroupItem className="p-0 px-3 pt-0">
              <Row>
                <OverRoll
                  reviewAnalysis ={this.state.reviewAnalysis}
                />
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <UsersOverview />
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col>

        {/* New Draft */}
        {/* <Col lg="4" md="6" sm="12" className="mb-4">
          <NewDraft />
        </Col> */}

        {/* Discussions */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <Discussions />
        </Col>

        {/* Top Referrals */}
        <Col lg="4" md="12" sm="12" className="mb-4">
          <TopReferrals />
        </Col>
      </Row>
    </Container>
  )}}


BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
  overRoll: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    {
      label: "네이버 블로그",
      value: "0",
      percentage: "0%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "유튜브 댓글",
      value: "0",
      percentage: "0",
      increase:false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "다음 카페",
      value: "0",
      percentage: "0%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    },
    {
      label: "다음 블로그",
      value: "0",
      percentage: "0",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 1, 1, 1, 1, 1, 1]
        }
      ]
    }
  ]
};

export default BlogOverview;
