import React, { useState } from 'react'
import styled from 'styled-components'
import CategoryModal from './CategoryModal'
import { useMyContext } from '../../shared/ContextApi'

const CategoryOpen = () => {
  const [categoryContent, setCategoryContent] = useState('all')
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const myContext = useMyContext();

  const all = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(0)
    myContext.setCategoryNum(1)
  }
  const start = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(1)
    myContext.setCategoryNum(1)
  }
  const participate = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(2)
    myContext.setCategoryNum(1)
  }
  const behind = (e) => {
    setCategoryContent(e.target.id)
    myContext.setTabNum(3)
    myContext.setCategoryNum(1)
  }
  return (
    <>
    <CategoryContainer>
        <CategoryDisplay>
            <CategoryContent id='all' onClick={all} categoryContent={categoryContent}>전체</CategoryContent>
            <CategoryContent id='start' onClick={start} categoryContent={categoryContent}>작성한 글</CategoryContent>
            <CategoryContent id='participate' onClick={participate} categoryContent={categoryContent}>참여한 글</CategoryContent>
            <CategoryContent id='behind' onClick={behind} categoryContent={categoryContent}>숨긴 글</CategoryContent>
        </CategoryDisplay>
        <CategoryButton id='categoryBtn' onClick={() => { setIsOpenCategory(!isOpenCategory) }} >카테고리 ▼</CategoryButton>
      </CategoryContainer>
       {/* 카테고리모달창 */}
       <CategoryModal shown={isOpenCategory} close={() => { setIsOpenCategory(false) }} /> 
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
    font-size: 20px;
    font-weight: 400;
    color:${(props) => (props.id === props.categoryContent) ? '#000000' : '#A3A3A3'};
    border-bottom: 1px solid ${(props) => (props.id === props.categoryContent) ? '#000000' : '#fff'};
    cursor: pointer;
`

const CategoryButton = styled.button`
    margin-right: 15px;
    font-size: 20px;
    font-weight: 400;
    border: none;
    cursor: pointer;
    background-color: transparent;
`

export default CategoryOpen