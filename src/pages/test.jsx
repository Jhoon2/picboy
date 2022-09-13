import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const ProceedingGif = () => {
  const [reviewVisible, setReviewVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const tabRef = useRef();
  const topRef = useRef();

  const reviewHandler = () => {
    setReviewVisible(true);
    setInfoVisible(true);
    tabRef.current.scrollIntoView();
    topRef.current.scrollIntoView();
  };

  const infoHandler = () => {
    setInfoVisible(false);
    setReviewVisible(false);
    tabRef.current.scrollIntoView();
    topRef.current.scrollIntoView();
  };
  return (
    <>
      <ViewTab ref={tabRef}>
        <ul>
          <ViewTabList reviewVisible={reviewVisible}>
            <InfoBtn onClick={() => infoHandler()}>상품정보</InfoBtn>
          </ViewTabList>

          <ViewTabList>
            <div></div>
            <ReiviewBtn
              reviewVisible={reviewVisible}
              onClick={() => reviewHandler()}
            >
              상품후기
            </ReiviewBtn>
          </ViewTabList>
        </ul>
      </ViewTab>

      {!infoVisible && (
        <DetailShow ref={topRef}>
          <div></div>
          <div>
            <figure></figure>
          </div>
          <RequiredInfo>
            <h4>상품상세정보</h4>
            <table>
              <tbody>
                <tr>
                  <th>제품명</th>
                </tr>
                <tr>
                  <th>
                    법에 의한 인증 허가 등을 받았음을 확인할 수 있는 경우 그에
                    대한 사항
                  </th>
                  <td>해당없음</td>
                </tr>
                <tr>
                  <th>크기</th>
                  <td>123x181mm</td>
                </tr>
                <tr>
                  <th>제조사 및 수입자명</th>
                  <td>한림문화사</td>
                </tr>
                <tr>
                  <th>제조국</th>
                  <td>한국</td>
                </tr>
                <tr>
                  <th>사용연령</th>
                  <td>8세 이상</td>
                </tr>
                <tr>
                  <th>상품문의</th>
                  <td>1:1 문의게시판으로 문의해주세요</td>
                </tr>
              </tbody>
            </table>
          </RequiredInfo>
        </DetailShow>
      )}
    </>
  );
};

export default ProceedingGif;

const ViewTab = styled.div`
  position: sticky;
  top: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  ul {
    cursor: pointer;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    display: flex;
    div {
      width: 1px;
      height: 16px;
      background-color: #ddd;
      display: block;
      content: '';
      box-sizing: border-box;
    }
  }
`;
const ViewTabList = styled.li`
  a:first-child {
    color: ${({ reviewVisible }) => (reviewVisible ? '#ccc' : '#000')};
  }
  width: 100%;
  font-size: 16px;
  color: #ccc;
  line-height: 19px;
  display: flex;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    text-decoration: none;
  }
`;

const InfoBtn = styled.a`
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ reviewVisible }) => (reviewVisible ? '#000' : '#ccc')};
  text-decoration: none;
  border: none;
  cursor: pointer;
`;

const ReiviewBtn = styled.a`
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ reviewVisible }) => (reviewVisible ? '#000' : '#ccc')};
  text-decoration: none;
  border: none;
  cursor: pointer;
  span {
    margin-left: 4px;
    color: #2ac1bc;
    display: inline-block;
    font-weight: 400;
  }
`;

const DetailShow = styled.section`
  text-align: center;
  display: block;
  padding: 80px 0 0 0;
  div:first-child {
    margin-bottom: 80px;
  }
  figure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    img {
      border: none;
      vertical-align: middle;
    }
  }
`;

const RequiredInfo = styled.div`
  width: 900px;
  margin: 200px auto 0 auto;
  h4 {
    padding-bottom: 24px;
    font-size: 20px;
    color: #000;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
  }
  table {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    tbody {
      display: table-row-group;
      vertical-align: middle;
      tr {
        display: table-row;
        vertical-align: inherit;
        th {
          width: 180px;
          color: #000;
          font-weight: 400;
          word-break: keep-all;
          background-color: #fafafa;
          padding: 16px;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        td {
          color: #999;
          padding: 16px;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
`;
