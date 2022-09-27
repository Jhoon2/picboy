import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { __postReport } from '../redux/modules/Report';
import reportBef from '../images/Com/reportBef.svg';
import reportAft from '../images/Com/reportAft.svg';

const Report = ({ item }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [text, setText] = useState(false);
  const [toggleDeclar, setToggleDecla] = useState(item.reported)

  const { reports } = useSelector((state) => state.reports)
  const id = item.id;
  
  function onReport() {
    setToggleDecla(!toggleDeclar)
    dispatch(__postReport(id));
  }

  const node = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      if (select && node.current && !node.current.contains(e.target)) {
        setSelect(false);
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [select]);

  return (
    <div ref={node}>
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
                    setText(!text);
                    onReport();
                  }}
                >
                  <Newimg img={reportBef}>
                    <Text> {toggleDeclar ? '신고취소' : '신고하기'}</Text>
                  </Newimg>
                </ReportButton>
              </New>
            </ul>
          </SelectList>
        )}
      </SelectListBox>
    </div>
  );
};

export default Report;

const SelectBox = styled.div`
  position: relative;
`;
const Select = styled.button`
  top: -15px;
  right: 15px;
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
  width: 60px;
  margin-left: 18px;
  margin-top: -5px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
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