import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect
} from "shards-react";
import Context from "../../context/index"
import { set } from "lodash";


class TopReferrals extends React.Component {
  static contextType = Context
  constructor(props){
    super(props);

    this.state ={
      pastContext : {},
      topReferrals : this.props.referralData

    }
  }

  componentDidMount(){
    this.setState({pastContext: this.context.totalData.orderedWord})
  }

  componentDidUpdate(){
    if(this.state.pastContext !== this.context.totalData.orderedWord){
      this.setState({ topReferrals :this.context.totalData.orderedWord })      
      this.setState({pastContext: this.context.totalData.orderedWord})
    }
  }

  render(){
    const {title, referralData} = this.props
    const { topReferrals } = this.state

    return(
      <Card small>
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
        <div className="block-handle" />
      </CardHeader>
  
      <CardBody className="p-0">
        <ListGroup small flush className="list-group-small">
          {topReferrals.map((item, idx) => (
            <ListGroupItem key={idx} className="d-flex px-3">
              <span className="text-semibold text-fiord-blue">{item.title}</span>
              <span className="ml-auto text-right text-semibold text-reagent-gray">
                {item.value}
              </span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
  
      <CardFooter className="border-top">
        <Row>
          {/* Time Span */}
          <Col>
            <FormSelect
              size="sm"
              value="last-week"
              style={{ maxWidth: "130px" }}
              onChange={() => {}}
            >
              <option value="last-week">Last Week</option>
              <option value="today">Today</option>
              <option value="last-month">Last Month</option>
              <option value="last-year">Last Year</option>
            </FormSelect>
          </Col>
  
          {/* View Full Report */}
          <Col className="text-right view-report">
            {/* eslint-disable-next-line */}
            <a href="#">Full report &rarr;</a>
          </Col>
        </Row>
      </CardFooter>
    </Card>
    )
  }
}

TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array
};

TopReferrals.defaultProps = {
  title: "긍 부정 단어 빈도수 정렬",
  referralData: [
    {
      title: "GitHub",
      value: "10,000"
    },
    {
      title: "Stack Overflow",
      value: "8,000"
    },
    {
      title: "Hacker News",
      value: "7,000"
    },
    {
      title: "Reddit",
      value: "3,000"
    },
    {
      title: "The Next Web",
      value: "2,000"
    },
    {
      title: "Tech Crunch",
      value: "100"
    },
    {
      title: "YouTube",
      value: "10"
    },
    {
      title: "Adobe",
      value: "1"
    }
  ]
};

export default TopReferrals;
