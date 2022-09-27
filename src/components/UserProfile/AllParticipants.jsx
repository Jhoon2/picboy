import React,{useRef, useEffect} from 'react'
import styled from 'styled-components'

//이미지
import basicImg from '../../images/basicImg.jpg'
import grayPerson from '../../images/mypage/Person.png'

//소리
import { pop1PB } from '../../global/sound'

const AllParticipants = ({ shown, close, data, Firstickname, FirstProfileImg }) => {
  const node = useRef();

  //다른 사람 이동
  const moveOtherPerson = (id) => {
    window.location.href = `/user-profile/${id}`
  }

  useEffect(() => {
    const clickOutside = (e) => {
      if (!node.current.contains(e.target)) {
        close()
      }
    };

    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return shown ? (
    <FullOverLay  ref={node}>
      <Overlay >
        <OverlayPosition >
          <OverlayContainer>
            <ModalContainer onClick={e => { e.stopPropagation() }}>
              <FirstAuthor style={{marginTop:'10px'}}>최초 작성자</FirstAuthor>
              <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-between',cursor:'pointer' }}
                onClick={() => {
                  moveOtherPerson(data[0].username)
                }}>
                <div style={{ display: 'flex' }}>
                  <FirstImg src={FirstProfileImg} />
                  <FirstNickname style={{marginTop:'3px'}}>{Firstickname }</FirstNickname>
                </div>
                <PersonImg1 src={grayPerson} />
              </div>
              <FirstAuthor>참여자</FirstAuthor>
              {data && data.splice(1).map((person, idx) => {
                return (
                  <div key={idx} style={{ display: 'flex', padding: '10px', marginLeft: '-5px', justifyContent: 'space-between',cursor:'pointer' }}
                    onClick={() => {
                      moveOtherPerson(person.username);
                    }}>
                    <div >
                      <DataPersonContainer  >
                        <PersonImg src={!person.img?basicImg : person.img} ></PersonImg>
                        <PersonText>{person.nickname}</PersonText>
                        </DataPersonContainer>
                    </div>
                    <PersonImg1 src={grayPerson} style={{marginTop:'22px'}}/>
                  </div>
                )
              })}
            </ModalContainer>
          </OverlayContainer>
        </OverlayPosition>
      </Overlay>
    </FullOverLay>
  ) : null
}
const FullOverLay = styled.div`
  width: 1800px;
  position: relative;
  top: -1000px;

`

const Overlay = styled.div`
  z-index: 9999;
  position: absolute;
  top: 550px;
  left: 380px;

`
const OverlayContainer = styled.div`
  /* width: 200px; */
  /* position: absolute; */
  position: absolute;
    /* top: 550px;
    left: 1300px; */
`
const OverlayPosition = styled.div`
  height: 30px;
  position:absolute;

`
const ModalContainer = styled.div`
  width: 234px;
  height: 161px;
  position: absolute;
  z-index: 9999;
  border: 2px solid #000000;
  background-color: white;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
    background: #e6e6e6;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    background-clip: padding-box;
  }
`
const DataPersonContainer = styled.div`
  margin-top: 6px;
  padding: 0.6rem;
  display: flex;
  cursor: pointer;
`
const FirstAuthor = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.inactive};
`

const FirstImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
`
const FirstNickname = styled.div`
  margin-top: 3px;
  margin-left: 10px;
  color: ${(props) => props.theme.basic};
  font-size: ${(props) => props.theme.Caption2};
`

const PersonImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 32px;
`
const PersonImg1 = styled.img`
  width: 14px;
  height: 14px;
  margin-top: 10px;
  cursor: pointer;

`

const PersonText = styled.div`
  margin-top: 9px;
  margin-left: 10px;
  color: ${(props) => props.theme.basic};
  font-size: ${(props) => props.theme.Caption2};
`
export default AllParticipants