import React from "react"
import { Card, CardBody, CardHeader, ListGroupItem } from "shards-react";



class SimilarSentense extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const cosinList = this.props.cosinList

        return(
            <Card small className="mb-3">
            <CardHeader className="border-bottom">
                <h5 className="m-0">유사 문장 상위 5개</h5>
            </CardHeader>
            <CardBody>
                {cosinList && cosinList.map((item, idx) => (
                    <ListGroupItem key={idx}>
                        <span>유사도 : {item[1]}  // {item[0]}</span>
                    </ListGroupItem>
                ))}
            </CardBody>
          </Card>
        )
    }
}

export default SimilarSentense;
