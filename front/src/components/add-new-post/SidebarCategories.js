import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";

const SidebarCategories = ({ title, repuScore }) => (
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h5 className="m-0">{title}</h5>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="px-3 pb-2">
          <h6>긍정 확률 : {repuScore.pos}</h6>
          <h6>부정 확률 : {repuScore.neg}</h6>
          <FormCheckbox className="mb-1" value="uncategorized" defaultChecked>
            세부 감정 분석
          </FormCheckbox>
        </ListGroupItem>
        <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                  </th>
                  <th scope="col" className="border-0">
                    확률 순위
                  </th>
                  <th scope="col" className="border-0" >
                    세부 감정 분류
                  </th>
                  <th scope="col" className="border-0">
                    확률
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> </td>
                  <td>1</td>
                  <td>기쁨</td>
                  <td>0.466</td>
                </tr>
                <tr>
                  <td> </td>
                  <td>2</td>
                  <td>슬픔</td>
                  <td>0.235</td>
                </tr>
                <tr>
                  <td> </td>
                  <td>3</td>
                  <td>흥분</td>
                  <td>0.198</td>
                </tr>
                <tr>
                  <td> </td>
                  <td>4</td>
                  <td>분노</td>
                  <td>0.03</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        {/* <ListGroupItem className="d-flex px-3">
          <InputGroup className="ml-auto">
            <FormInput placeholder="New category" />
            <InputGroupAddon type="append">
              <Button theme="white" className="px-2">
                <i className="material-icons">add</i>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroupItem> */}
        
      </ListGroup>
    </CardBody>
  </Card>
);

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  // title: "Categories"
  title: "감정분석 결과"
};

export default SidebarCategories;
