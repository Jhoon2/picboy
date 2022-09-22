import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { __postReport } from '../redux/modules/Report';
import reportBef from '../images/Com/reportBef.svg';
import reportAft from '../images/Com/reportAft.svg';

const Report = ({ item }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);

  const id = item.id;

  function onReport() {
    dispatch(__postReport(id));
  }

  return (
    <>
      <SelectBox>
        <Select>
          <div onClick={() => setSelect(!select)}>...</div>
        </Select>
      </SelectBox>
      <SelectListBox>
        {select && (
          <SelectList>
            <ul>
              <New>
                <ReportButton
                  onClick={() => {
                    onReport();
                  }}
                >
                  <Newimg img={reportBef}>
                    <Text>신고</Text>
                  </Newimg>
                </ReportButton>
              </New>
            </ul>
          </SelectList>
        )}
      </SelectListBox>
    </>
  );
};

export default Report;

const SelectBox = styled.div`
  position: relative;
`;
const Select = styled.button`
  top: -20px;
  right: 10px;
  position: absolute;
  background: none;
  font-family: 'NotoBold';
  font-weight: 400;
  font-size: 30px;
  line-height: 180%;
  color: #a3a3a3;

  &:hover {
    color: black;
  }
`;

const SelectList = styled.button`
  position: absolute;
  background: none;
  cursor: pointer;
  ul {
    ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
    width: 110px;
    height: 50px;
    margin: auto;
    background: white;
    border: 3px solid black;
  }
`;

const SelectListBox = styled.div`
  position: relative;
  top: 35px;
  left: 63%;
`;
const New = styled.li`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'flex-start')}
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;

const ReportButton = styled.div`
  width: 100px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'flex-start')}
`;
const Newimg = styled.div`
  width: 14px;
  height: 17px;
  margin-left: 20px;
  margin-top: 4px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('cotain')}
  &:hover {
    background: url(${reportAft});
  }
`;

const Text = styled.div`
  width: 30px;
  margin-left: 25px;
  margin-top: -3px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 180%;
  letter-spacing: -0.02em;
  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;

const SelectImg = styled.img`
  position: absolute;
  top: 50%;
  left: 80px;
  width: 12px;
  height: 12px;
  margin-top: -5px;
  display: block;
  transform: ${({ select }) => (select ? 'rotate(0deg)' : 'rotate(180deg)')};
`;