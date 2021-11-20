import React from "react";
import { Col, FormCheckbox } from "shards-react";
import { ButtonGroup, Button } from "shards-react";

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      period1: "primary",
      period2: "white",
      period3: "white"
    }
  }

  onChange = (e) => {
    if (e.target.id === 'period1') {
      this.setState({period1:"primary"});
      this.setState({period2:"white"});
      this.setState({period3:"white"});
    } else if (e.target.id === 'period2') {
      this.setState({period1:"white"});
      this.setState({period2:"primary"});
      this.setState({period3:"white"});
    } else if (e.target.id === 'period3') {
      this.setState({period1:"white"});
      this.setState({period2:"white"});
      this.setState({period3:"primary"});
    }
    console.log(e.target.id)
  }

  render() {
    return (
      <Col sm="12" md="4" className="mb-3">
        <strong className="text-muted d-block mb-3">분석 기간 선택</strong>
        <fieldset>
          <ButtonGroup className="mb-3">
            <Button id='period1' theme={this.state.period1} onClick={this.onChange}>1주</Button>
            <Button id='period2' theme={this.state.period2} onClick={this.onChange}>1달</Button>
            <Button id='period3' theme={this.state.period3} onClick={this.onChange}>1년</Button>
          </ButtonGroup>
          {/* <ButtonGroup className="mb-3">
            <Button theme="primary">Fizz</Button>
            <Button theme="white">Buzz</Button>
            <Button theme="white">Foo</Button>
            <Button theme="white">Bar</Button>
    </ButtonGroup>*/}
        </fieldset>
      </Col>
    )
  }
}

export default Checkboxes;
