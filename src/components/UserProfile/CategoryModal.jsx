import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useMyContext } from '../../shared/ContextApi'
import { __getUserData } from '../../redux/modules/UserPage'
import { useDispatch } from 'react-redux'
import NewBef from '../../images/listCategory/ListNewBef.svg';
import LikeBef from '../../images/listCategory/ListHeartBef.svg';
import CommBef from '../../images/listCategory/ListCommBef.svg';
import NewAft from '../../images/listCategory/ListNewAft.svg';
import LikeAft from '../../images/listCategory/ListHeartAft.svg';
import CommAft from '../../images/listCategory/ListCommAft.svg';
import ViewBef from '../../images/listCategory/ViewBef.svg';
import ViewAft from '../../images/listCategory/ViewAft.svg';

const CategoryModal = ({children, shown, close,username}) => {
  const [categoryContent, setCategoryContent] = useState('recent')
  const myContext = useMyContext();
  const dispatch = useDispatch();
  // console.log(myContext.categoryNum)
  const recent = (e) => {
    setCategoryContent(e.target.id)
    myContext.setCategoryNum(1)
    dispatch(__getUserData({
      tab: myContext.tabNum,
      username:username,
      category: 1
  }))
  }
  const liked = (e) => {
    setCategoryContent(e.target.id)
    myContext.setCategoryNum(2)
    dispatch(__getUserData({
      tab: myContext.tabNum,
      username:username,
      category: 2
  }))
  }
  const comments = (e) => {
    setCategoryContent(e.target.id)
    myContext.setCategoryNum(3)
    dispatch(__getUserData({
      tab: myContext.tabNum,
      username:username,
      category: 3
  }))
  }
  const views = (e) => {
    setCategoryContent(e.target.id)
    myContext.setCategoryNum(4)
    dispatch(__getUserData({
      tab: myContext.tabNum,
      username:username,
      category: 4
  }))
  }

  return shown? (
    <Overlay onClick={()=>{close()}}>
      <OverlayPosition >
        <OverlayContainer>
          <div onClick={e => {e.stopPropagation();}}>
            <SelectList>
            <ul>
              <New>
                <Title
                  onClick={recent}
                >
                  <Newimg img={NewBef}>
                    <Text>최신순</Text>
                  </Newimg>
                </Title>
              </New>
              <HR />
              <Like>
                <Title  onClick={liked} >
                  <Likeimg img={LikeBef}>
                    <Text>좋아요</Text>
                  </Likeimg>
                </Title>
              </Like>
              <HR />
              <Comm>
                <Title  onClick={comments}>
                  <Commimg img={CommBef}>
                    <Text>댓글순</Text>
                  </Commimg>
                </Title>
              </Comm>
              <HR />
              <View>
                <Title onClick={views}>
                  <Viewimg img={ViewBef}>
                    <Text>조회순</Text>
                  </Viewimg>
                </Title>
              </View>
            </ul>
          </SelectList>
          </div>
        </OverlayContainer>
      </OverlayPosition>
    </Overlay>
  ) : null
}

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
`
const OverlayContainer = styled.div`
  width: 200px;
  position: absolute;
`
const OverlayPosition = styled.div`
  height: 30px;
  position:relative;
  top: 780px;
  left: 430px;
`
const HR = styled.hr`
  width: 110px;
  border: 0;
  height: 1px;
  background: #ccc;
`;
const SelectList = styled.div`
  position: absolute;
  cursor: pointer;
  ul {
    width: 145px;
    min-height: 154px;
    background: white;
    border: 3px solid black;
    padding: 20px;
  }
`;

const New = styled.div`
  ${({ theme }) => theme.flexSet('column', 'flex-start', 'center')}

  color: #a3a3a3;
  &:hover {
    color: black;
  }
`;
const Like = styled(New)``;
const Comm = styled(New)``;
const View = styled(New)``;

const Title = styled.div`
  width: 100px;
  height: 25px;
  ${({ theme }) => theme.flexSet('row', 'flex-start', 'center')}
`;

const Newimg = styled.div`
  width: 20px;
  height: 19px;
  position: relative;
  margin-right: 7px;
  background: url(${(props) => props.img});
  ${({ theme }) => theme.backgroundSet('contain')}
  &:hover {
    background: url(${NewAft});
  }
`;

const Likeimg = styled(Newimg)`
  &:hover {
    background: url(${LikeAft});
  }
`;

const Commimg = styled(Newimg)`
  &:hover {
    background: url(${CommAft});
  }
`;

const Viewimg = styled(Newimg)`
  width: 20px;
  height: 14px;

  &:hover {
    background: url(${ViewAft});
  }
`;

const Text = styled.div`
  width: 50px;
  margin-left: 30px;
  position: absolute;
  bottom: -4px;
  font-family: 'NotoBold';
  font-weight: 700;
  font-size: 14px;
  line-height: 180%;
`;


export default CategoryModal
