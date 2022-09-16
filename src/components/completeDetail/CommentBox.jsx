import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { __deleteComment, __editComment } from '../../redux/modules/comments'
import UseGetUser from '../../hooks/UseGetUser'

const CommentBox = ({ commentList }) => {
  //로그인한 사람 정보
  const useGet = UseGetUser();
  const userNickname = useGet && useGet.data.data.nickname;

  const dispatch = useDispatch();
    //수정
    const [editState, setEditState] = useState(false)
    const [edit, setEdit] = useState('')
  
    const editBtn = () => {
      setEditState(true)
    }
    const editOnChange = (e) => {
      setEdit(e.target.value)
    }
    const completeBtn = () => {
      if(edit === '') return setEditState(false)
      const newList = {
        commentId: commentList.commentId,
        content: edit
      }
      dispatch(__editComment(newList))
      setEditState(false)
    }
    //삭제
  const deleteBtn = () => {
    console.log(commentList.commentId)
      dispatch(__deleteComment(commentList.commentId))
      alert('삭제완료!')
  }
  
  //완료,삭제버튼(로그인유저와 같으면 뜸)
  let button;
  let button_1;
    if (editState === true) {
        button = <button style={{ mr: 3, cursor: 'pointer' }} onClick={completeBtn} >완료</button>
        button_1 = <button style={{ mr: 3, cursor: 'pointer' }} onClick={deleteBtn}>삭제</button>
    } else {
        button =<button style={{ mr: 3, cursor: 'pointer' }} onClick={editBtn }>수정</button>
        button_1 = <button style={{ mr: 3, cursor: 'pointer' }} onClick={deleteBtn}>삭제</button>
    }

  return (
    <Comment>
        <CommentContainer>
            <div style={{display:'flex'}}>
              <CommentUserProfileImg src={commentList.profileImg} alt="" />
              <CommentIdContents>
                  <CommentUserNickName>{commentList.nickname}</CommentUserNickName>
            {editState ? <EditCommentInput placeholder={commentList.comment}
            onChange={editOnChange}></EditCommentInput> : <UserComment>{commentList.comment}</UserComment>}
              </CommentIdContents>
        </div>
        {userNickname === commentList.nickname ? <div>
                {button}
                {button_1}
            </div> : null }

        
        </CommentContainer>
    </Comment>
  )
}
const Comment = styled.div`
    /* display: flex; */
    padding: 36px;
    &:hover {
        background-color: #f8f8f8;
    }
`;

const CommentContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const CommentUserProfileImg = styled.img`
    width: 73px;
    height: 73px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 24px;
`;

const CommentIdContents = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const CommentUserNickName = styled.div`
    margin: 8px 0 24px 0;
    font-size: 20px;
    font-weight: 700;
`;

const UserComment = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const EditCommentInput = styled.input`
    width: 700px;
    height: 30px;
    font-size: 18px;
    color: #4a4949;
    border: none;
    outline: none;
`
export default CommentBox