import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";
import Context from "../../context/index"

class Discussions extends React.Component{
  static contextType = Context
  constructor(props) {
    super(props);

    this.state = {
      discussion : this.props.discussions,
      pastContext : {}
    }
  }

  onClick = () => {
    alert("관심 리뷰로 추가하였습니다.")
  }

  componentDidMount() {
    this.setState({pastContext : this.context.totalData.reviewList})
  }

  componentDidUpdate(){
    // const { totalData, setData } = this.context
    if(this.state.pastContext !== this.context.totalData.reviewList){
        console.log(this.context.totalData.reviewList)
      this.setState({
        discussion : this.context.totalData.reviewList,
        pastContext : this.context.totalData.reviewList})
    }
  }

  render(){
    const {title} = this.props
    const discussions = this.state.discussion
    return(
      <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="p-0">
          {discussions.map((discussion, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">

              {/* Content */}
              <div className="blog-comments__content">
                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                  <a className="text-secondary" href={discussion.author.url}>
                    {discussion.author.name}
                  </a>{" "}
                  {" "}
                  <a className="text-secondary" href={discussion.post.url}>
                    {discussion.post.title}
                  </a>
                  <span className="text-mutes">- {discussion.date}</span>
                </div>

                {/* Content :: Body */}
                <p className="m-0 my-1 mb-2 text-muted">{discussion.body}</p>

                {/* Content :: Actions */}
                <div className="blog-comments__actions">
                  <ButtonGroup size="sm">
                    <Button theme="white" onClick={this.onClick}>
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                      관심대상추가
                    </Button>
                    <Button theme="white" href={discussion.author.url}>
                  <span className="text-light">
                    <i className="material-icons">more_vert</i>
                  </span>{" "}
                      접속하기
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col className="text-center view-report">
              <Button theme="white" type="submit">
                View All Comments
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    )
  }
}


Discussions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array
};

Discussions.defaultProps = {
  title: "평판 관리 추천대상",
  discussions: [
    {
      id: 1,
      date: "",
      author: {
        image: require("../../images/avatars/1.jpg"),
        name: "",
        url: "https://github.com/CSID-DGU/2021-1-CECD3-SASO-2"
      },
      post: {
        title: "",
        url: "#"
      },
      body: ""
    }
  ]
};

export default Discussions;
