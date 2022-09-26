import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CategoryModal from './CategoryModal'
import { useMyContext } from '../../shared/ContextApi'
import { __getUserData } from '../../redux/modules/UserPage'
import downBtn from '../../images/Arrow drop down.png'
import upBtn from '../../images/triangle.png'

const CategoryOpen = ({ value,username,data }) => {
  const [isOpenCategory, setIsOpenCategory] = useState(false)

  const [categoryContent, setCategoryContent] = useState('all')
  const myContext = useMyContext();
  const dispatch = useDispatch();
  
  //카테고리 열고 닫기
  const toggleCategoryButton = () => {
    setIsOpenCategory(!isOpenCategory)
  }

  //데이터 send, reset
  const resetData = (tabInfo) => {
    dispatch(__getUserData(tabInfo))
  }

  //event 함수를 쓸 때는 event에 대한 이름으로 작성 ex) handleClickAll
  const handleClickAll = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(0)
    myContext.setCategoryNum(1)
    myContext.setPageNum(0)
    const tabInfo = {
      tab: 0,
      category: 1,
      username: username,
    }
    resetData(tabInfo)
  }
  const handleClickStart = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(1)
    myContext.setCategoryNum(1)
    myContext.setPageNum(0)
    const tabInfo = {
      tab: 1,
      category: 1,
      username: username
    }
    resetData(tabInfo)
  }
  const handleClickParticipate = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(2)
    myContext.setCategoryNum(1)
    myContext.setPageNum(0)
    const tabInfo = {
      tab: 2,
      category:1,
      username: username
    }
    resetData(tabInfo)
  }
  const handleClickBehind = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(3)
    myContext.setCategoryNum(1)
    const tabInfo = {
      tab: 3,
      category:1,
      username: username
    }
    resetData(tabInfo)
  }
  return (
    <>
    <CategoryContainer>
        <CategoryDisplay className='what'>
            <CategoryContent id='all' onClick={handleClickAll} categoryContent={categoryContent}>전체</CategoryContent>
            <CategoryContent id='start' onClick={handleClickStart} categoryContent={categoryContent}>작성한 글</CategoryContent>
            <CategoryContent id='participate' onClick={handleClickParticipate} categoryContent={categoryContent}>참여한 글</CategoryContent>
          {value  ? <CategoryContent id='behind' onClick={handleClickBehind} categoryContent={categoryContent}>숨긴 글</CategoryContent>
            : null}
        </CategoryDisplay>
        <CategoryButton id='categoryBtn' onClick={toggleCategoryButton} >
            {isOpenCategory ?
              <div style={{display:'flex'}} >
                <div>닫기</div>
                <BtnUp src={upBtn} />
              </div>
               : 
               <div style={{display:'flex'}}>
                <div>카테고리</div>
                <BtnDown src={downBtn} />
              </div>
              }
            
          {/* </div> */}
        </CategoryButton> 
      </CategoryContainer>
      {/* 카테고리모달창 */}
        <CategoryModal shown={isOpenCategory} close={() => { setIsOpenCategory(false) }}
         username={username} />
    
    </>
      )
}
const CategoryContainer = styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
`
const CategoryDisplay = styled.div`
    display: flex;
`

const CategoryContent = styled.div`
    margin-right: 20px;
    font-size: ${(props) => props.theme.Caption1};
    font-weight: ${(props) => (props.id === props.categoryContent) ? props.theme.HeadlineBD : props.theme.SubTitleRG};
    color:${(props) => (props.id === props.categoryContent) ? props.theme.basic : props.theme.inactive};
    border-bottom: 1px solid ${(props) => (props.id === props.categoryContent) ? '#000000' : '#fff'};
    cursor: pointer;
`
const CategoryButton = styled.button`
    margin-top: -8px;
    margin-right: 15px;
    font-size: ${(props) => props.theme.Caption1};
    font-weight: ${(props) => props.theme.BodyRG};

    border: none;
    cursor: pointer;
    background-color: transparent;
`

const BtnDown = styled.img`
  width: 35px;
  margin-top: -7px;
`
const BtnUp = styled.img`
  width: 16px;
  height: 11px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
`

export default CategoryOpen