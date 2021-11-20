import React from "react";
import { Row, Col, FormCheckbox } from "shards-react";


class ToggleButtons extends React.Component{
  constructor(props){
    super(props);

    this.state = { 
      naver_blog : "on",
      daum_blog : "on",
      youtube : "on"
    }
  }

  onChange_checkBox = (e) => {
    if (e.target.id === 'check_naver_blog') {
      this.state.naver_blog = ( this.state.naver_blog === 'on' ? 'off' : 'on');
    } else if (e.target.id === 'check_daum_blog'){
      this.state.daum_blog = ( this.state.daum_blog === 'on' ? 'off' : 'on');
    } else if (e.target.id === 'check_youtube'){
      this.state.youtube = ( this.state.youtube === 'on' ? 'off' : 'on');
    }
  }

  render(){
    return(
      <Col sm="12" md="4" className="mb-3">
        <strong className="text-muted d-block mb-2">분석 채널 선택</strong>
        <fieldset>
          <FormCheckbox id='check_naver_blog' toggle small defaultChecked onChange={this.onChange_checkBox}>
            네이버 블로그
          </FormCheckbox>
          <FormCheckbox id='check_daum_blog' toggle small defaultChecked onChange={this.onChange_checkBox} >
            다음 블로그
          </FormCheckbox>
          <FormCheckbox id='check_youtube' toggle small defaultChecked onChange={this.onChange_checkBox}>
            유튜브 댓글
          </FormCheckbox>
          {/* <FormCheckbox toggle small defaultChecked disabled>
            유튜브 댓글
          </FormCheckbox> */}
        </fieldset>
      </Col>
    )
  }
}

export default ToggleButtons;
