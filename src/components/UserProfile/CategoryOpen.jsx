import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import CategoryModal from './CategoryModal'
import { useMyContext } from '../../shared/ContextApi'
import { __getUserData } from '../../redux/modules/UserPage'
import downBtn from '../../images/Arrow drop down.png'
import ListCategories from '../../elem/ListCategories'

const CategoryOpen = ({ value,username }) => {
  const [select, setSelect] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = React.useState(false)

  const [categoryContent, setCategoryContent] = useState('all')
  const myContext = useMyContext();
  const dispatch = useDispatch();

  //event 함수를 쓸 때는 event에 대한 이름으로 작성 ex) handleClickAll
  const handleClickAll = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(0)
    myContext.setCategoryNum(1)
    const tabInfo = {
      tab: 0,
      category: 1,
      username: username
    }
    dispatch(__getUserData(tabInfo))
  }
  const handleClickStart = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(1)
    myContext.setCategoryNum(1)
    const tabInfo = {
      tab: 1,
      category: 1,
      username: username
    }
    dispatch(__getUserData(tabInfo))
  }
  const handleClickParticipate = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(2)
    myContext.setCategoryNum(1)
    const tabInfo = {
      tab: 2,
      category:1,
      username: username
    }
    dispatch(__getUserData(tabInfo))
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
    dispatch(__getUserData(tabInfo))
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
        <CategoryButton id='categoryBtn' onClick={() => { setIsOpenCategory(!isOpenCategory) }} >
         <div style={{display:'flex'}}>
            <div>카테고리</div>
            <BtnDown src={downBtn} />
          </div>
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

export default CategoryOpen