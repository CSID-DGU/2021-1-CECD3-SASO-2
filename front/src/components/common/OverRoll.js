import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";
import { Card, CardBody, ListGroup, ListGroupItem } from "shards-react";

import Chart from "../../utils/chart";

class OverRoll extends React.Component {
  constructor(props) {
    super(props);


  }



  render() {

    const reviewAnalysis = this.props.reviewAnalysis

    return (
        <CardBody className={"p-0"}>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                <span className="d-flex mb-2">
                        <i className="material-icons mr-1">flag</i>
                        <strong className="mr-1">리뷰 수 가장 많은 도메인 :</strong>{" "}
                        <strong className="text-success">{reviewAnalysis.mostReviewDomain}</strong>{" "}
                      </span>
                      <span className="d-flex mb-2">
                        <i className="material-icons mr-1">visibility</i>
                        <strong className="mr-1">리뷰 증가량이 가장 많은 도메인 :</strong>{" "}
                        <strong className="text-warning">{reviewAnalysis.increaseReviewDomain}</strong>{" "}
                      </span>
                      <span className="d-flex mb-2">
                        <i className="material-icons mr-1">calendar_today</i>
                        <strong className="mr-1">감소량이 가장 많은 도메인 :</strong> {reviewAnalysis.decreaseReviewDomain}{" "}
                      </span>
                      <span className="d-flex">
                        <i className="material-icons mr-1">score</i>
                        <strong className="mr-1">분석 기간 게시글 수 :</strong>{" "}
                        <strong className="text-fail">총 {reviewAnalysis.totalToday}개</strong>
                      </span>
                </ListGroupItem>
            </ListGroup>
        </CardBody>
    );
  }
}

OverRoll.propTypes = {
  /**
   * The Small Stats variation.
   */
  mostPos: PropTypes.string,
  /**
   * The label.
   */
  mostNeg: PropTypes.string,
  /**
   * The value.
   */
   mostRef: PropTypes.string,
  /**
   * Whether is a value increase, or not.
   */
  totalToday: PropTypes.number
};

OverRoll.defaultProps = {
  mostPos: "네이버 블로그",
  mostNeg:"유튜브",
  mostRef:"유튜브",
  totalToday: 0
};

export default OverRoll;
