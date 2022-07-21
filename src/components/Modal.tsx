import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardIndexState, modalState, toDosState } from '../atoms';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalArea = styled.div<IModalProps>`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  top: 0;
  left: 0;
  animation: modal-show 0.3s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Wrapper = styled.div`
  width: 30%;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  z-index: 2;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 40px;
  svg {
    position: absolute;
    bottom: 0;
    right: 0%;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
  }
  p {
    font-size: 24px;
    font-weight: bold;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;
const Header = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 40px;
  background: ${props => props.theme.bgColor};
  svg {
    color: #fff;
    left: auto;
    right: 0;
    transform: none;
    padding-right: 15px;
  }
  input {
    width: calc(100% - 50px);
    background: transparent;
    height: 100%;
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    padding-left: 15px;
    &:focus {
      outline: none;
    }
  }
`;

interface IModalProps {
  show: boolean;
}

function Modal() {
  const [modalToggle, setToggle] = useRecoilState(modalState);
  const [toDos, setToDos] = useRecoilState(toDosState);
  const [boardIndex, setBoardIndex] = useRecoilState(boardIndexState);
  const [changeTitle, setChangeTitle] = useState('');
  const closeModal = () => {
    if (changeTitle !== modalToggle.boardId) {
      setToDos(allBoards => {
        const result = {
          ...allBoards,
          [changeTitle]: allBoards[modalToggle.boardId],
        };
        delete result[modalToggle.boardId];
        localStorage.setItem('todos', JSON.stringify(result));
        return result;
      });
      setBoardIndex(allBoards => {
        const index = boardIndex.findIndex(
          board => board === modalToggle.boardId,
        );
        const result = allBoards.filter(board => board !== modalToggle.boardId);
        result.splice(index, 0, changeTitle);
        localStorage.setItem('board', JSON.stringify(result));
        return result;
      });
    }
    setToggle({ show: false, boardId: '' });
  };
  const boardIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setChangeTitle(value);
  };
  const onDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    setToDos(allBoards => {
      const result = { ...allBoards };
      delete result[modalToggle.boardId];
      localStorage.setItem('todos', JSON.stringify(result));
      return result;
    });
    setBoardIndex(allBoards => {
      const result = allBoards.filter(board => board !== modalToggle.boardId);
      localStorage.setItem('board', JSON.stringify(result));
      return result;
    });
    closeModal();
  };

  useEffect(() => {
    setChangeTitle(modalToggle.boardId);
  }, [modalToggle]);

  return (
    <ModalArea show={modalToggle.show}>
      <Wrapper>
        <Header>
          <input type='text' value={changeTitle} onChange={boardIdChange} />
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
        </Header>
        <p>여기에 뭘 넣어야 할까요...?</p>
        <FontAwesomeIcon icon={faTrashCan} onClick={onDelete} />
      </Wrapper>
      <Overlay onClick={closeModal} />
    </ModalArea>
  );
}

export default Modal;
