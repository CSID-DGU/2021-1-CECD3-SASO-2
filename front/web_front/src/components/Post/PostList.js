import React from 'react';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
 
const PostList = props => {
  return (
    <>
    <div>
      <CommonTable headersName={['사이트', '제목', '등록일', '부정지표']}>
          <CommonTableRow>
            <CommonTableColumn>[성예사]</CommonTableColumn>
            <CommonTableColumn>시술A 했는데 다음날 일어나보니 이렇게 되어있었어요</CommonTableColumn>
            <CommonTableColumn>10-25</CommonTableColumn>
            <CommonTableColumn>6</CommonTableColumn>
          </CommonTableRow>
          <CommonTableRow>
            <CommonTableColumn>[성예사]</CommonTableColumn>
            <CommonTableColumn>XX병원 데스크 직원 분이 불친절합니다.</CommonTableColumn>
            <CommonTableColumn>10-25</CommonTableColumn>
            <CommonTableColumn>5</CommonTableColumn>
          </CommonTableRow>
          <CommonTableRow>
            <CommonTableColumn>[성예사]</CommonTableColumn>
            <CommonTableColumn>강남에선 이 병원이 제일 좋은 것 같아요!</CommonTableColumn>
            <CommonTableColumn>10-25</CommonTableColumn>
            <CommonTableColumn>1</CommonTableColumn>
          </CommonTableRow>
          <CommonTableRow>
            <CommonTableColumn>[성예사]</CommonTableColumn>
            <CommonTableColumn>방송 나온 OO 병원 후기 올립니다.</CommonTableColumn>
            <CommonTableColumn>10-25</CommonTableColumn>
            <CommonTableColumn>2</CommonTableColumn>
          </CommonTableRow>
          <CommonTableRow>
            <CommonTableColumn>[성예사]</CommonTableColumn>
            <CommonTableColumn>손 원장님은 정말 이 분야에서는 최고이신 것 같아요!</CommonTableColumn>
            <CommonTableColumn>10-25</CommonTableColumn>
            <CommonTableColumn>4</CommonTableColumn>
          </CommonTableRow>
        </CommonTable>
        </div>
    </>
  )
}
 
export default PostList;