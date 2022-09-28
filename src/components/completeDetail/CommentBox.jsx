import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

//불러오기
import { __deleteComment, __editComment } from '../../redux/modules/comments'
import UseGetUser from '../../hooks/UseGetUser'
import { useMyContext } from '../../shared/ContextApi'
import AnyModal from '../../elem/AnyModal'
import basicImg from '../../images/mypage/basicImg.png'

const CommentBox = ({ commentList,accessToken }) => {
  //로그인한 사람 정보
  const useGet = UseGetUser();
  const userNickname = useGet && useGet.data.data.nickname;

  const myContext = useMyContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //수정
  const [editState, setEditState] = useState(false)
  const [edit, setEdit] = useState(commentList?.comment)

  const editBtn = () => {
    setEditState(true)
  }
  const editOnChange = (e) => {
    setEdit(e.target.value)
  }
  const completeBtn = () => {
    if (edit === '') return setEditState(false)
  
    const newList = {
      commentId: commentList.commentId,
      content: edit
    }
    dispatch(__editComment(newList))
    setEditState(false)
  }
  
    // const commentText = commentList.comment.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  
  //삭제
  const deleteBtn = () => {
    myContext.setCommetDeleteBtn(true)
    setTimeout(() => {
      dispatch(__deleteComment(commentList.commentId))
    },800)
   
  }

  //완료,삭제버튼(로그인유저와 같으면 뜸)
  let button;
  let button_1;
  if (editState === true) {
    button = <span style={{ mr: 3, cursor: 'pointer', fontSize: '12px', color: '#a3a3a3', fontWeight: '400', marginLeft: '16px' }} onClick={completeBtn} >완료</span>
    button_1 = <span style={{ mr: 3, cursor: 'pointer', fontSize: '12px', color: '#a3a3a3', fontWeight: '400', marginLeft: '16px' }} onClick={deleteBtn}>삭제</span>
  } else {
    button = <span style={{ mr: 3, cursor: 'pointer', fontSize: '12px', color: '#a3a3a3', fontWeight: '400', marginLeft: '16px' }} onClick={editBtn}>수정</span>
    button_1 = <span style={{ mr: 3, cursor: 'pointer', fontSize: '12px', color: '#a3a3a3', fontWeight: '400', marginLeft: '16px' }} onClick={deleteBtn}>삭제</span>
  }
  
  //유저페이지 이동
  const moveToUser = () => {
    if (accessToken === undefined) return myContext.setCommetApplyBtn(true);
    navigate (`/user-profile/${commentList?.username}`)
  }
  return (
  <>
      {myContext.commetDeleteBtn ? (
        <ErrorBox onClick={() => myContext.setCommetDeleteBtn(false)}>
          <AnyModal  content="삭제 되었습니다" />
        </ErrorBox>
      ) : null}
       {myContext.commetApplyBtn ? (
        <ErrorBox onClick={() => myContext.setCommetApplyBtn(false)}>
          <AnyModal title="회원정보" content="로그인 후 가능합니다" />
        </ErrorBox>
      ) : null}
    <Comment>
      <CommentContainer>
        <div style={{ display: 'flex' }}>
            <CommentUserProfileImg src={commentList?.profileImage ? commentList?.profileImage : basicImg} alt=""
              onClick={moveToUser}
            />
          <CommentIdContents>
            <CommentUserNickName>{commentList.nickname}</CommentUserNickName>
              {editState ? <EditCommentInput
                type="text"
                value={edit}
                maxLength='80'
              onChange={editOnChange}></EditCommentInput> : <UserComment>{commentList.comment}</UserComment>}
          </CommentIdContents>
        </div>
        {userNickname === commentList.nickname ?
          <div>
            {button}
            {button_1}
          </div>
          : null
        }
      </CommentContainer>
      </Comment>
      </>
  )
}
const ErrorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Comment = styled.div`
    /* display: flex; */
    padding: 24px;
    background-color: #fff;
    &:hover {
        background-color: #f8f8f8;
    }
`;

const CommentContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const CommentUserProfileImg = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 24px;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
`;

const CommentIdContents = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const CommentUserNickName = styled.div`
    margin: 8px 0 6px 0;
    font-size: 16px;
    font-weight: 700;
`;

const UserComment = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const EditCommentInput = styled.input`
    width: 700px;
    height: 30px;
    font-size: 18px;
    color: #4a4949;
    border: none;
    outline: none;
`;
export default CommentBox