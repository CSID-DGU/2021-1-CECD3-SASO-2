import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";
import Context from "../../context/index";

import Chart from "../../utils/chart";


class UsersByDevice extends React.Component {
  static contextType = Context
  constructor(props) {
    super(props);

    this.state = {
      chart : null,
      pastContext : {},
      testState : this.props,
      chartDate : []
    }

    this.canvasRef = React.createRef();
  }


  componentDidMount() {    
    this.setState({pastContext : this.context.totalData.totalPosNeg})
    const chartConfig = {
      type: "pie",
      data: this.state.testState.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };
    const chart = new Chart(this.canvasRef.current, chartConfig);
    this.setState({ chart : chart})
  }

  componentDidUpdate(){
    // const { totalData, setData } = this.context
    if(this.state.pastContext !== this.context.totalData.totalPosNeg){
      this.state.chart.data.datasets[0].data = this.context.totalData.totalPosNeg.data //비율 입력
      this.state.chart.data.labels = this.context.totalData.totalPosNeg.labels //라벨 입력
      this.state.chart.update()
    }
  }


  render() {
    const { title } = this.props;    

    return (
        <Card small className="h-100">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <CardBody className="d-flex py-0">
            <canvas
              height="220"
              ref={this.canvasRef}
              className="blog-users-by-device m-auto"
            />
          </CardBody>
          <CardFooter className="border-top">
            <Row>
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
              <Col className="text-right view-report">
                {/* eslint-disable-next-line */}
                <a href="#">View full report &rarr;</a>
              </Col>
            </Row>
          </CardFooter>
        </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "전체 긍 부정 비율",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [89.3, 8.7, 2.1],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.3)"
        ]
      }
    ],
    labels: ["긍정", "부정", "중립"]
  }
};

export default UsersByDevice;
