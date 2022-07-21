import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDos, modalState, toDosState } from '../atoms';
import Card from './Card';

interface IBoradProps {
  todos: IToDos[];
  boardId: string;
  index: number;
}
interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
interface IForm {
  todo: string;
}
interface IWrapperProps {
  isDragging: boolean;
}

function Board({ todos, boardId, index }: IBoradProps) {
  const setToDos = useSetRecoilState(toDosState);
  const setModal = useSetRecoilState(modalState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    setToDos(oldToDos => {
      const result = {
        ...oldToDos,
        [boardId]: [{ title: todo, id: Date.now() }, ...oldToDos[boardId]],
      };
      localStorage.setItem('todos', JSON.stringify(result));
      return result;
    });
    setValue('todo', '');
  };
  const openModal = () => {
    setModal(current => {
      return { show: true, boardId };
    });
  };
  return (
    <Draggable draggableId={`${boardId}board`} index={index}>
      {(magic, info) => {
        return (
          <Wrapper
            isDragging={info.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
          >
            <Title>{boardId}</Title>
            <Menu onClick={openModal}>
              <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
            </Menu>
            <Droppable droppableId={boardId} type='todo'>
              {(magic, info) => {
                return (
                  <Area
                    isDraggingOver={info.isDraggingOver}
                    draggingFromThisWith={Boolean(info.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    {todos.map((todo, index) => (
                      <Card
                        todoTitle={todo.title}
                        todoId={todo.id}
                        index={index}
                        key={todo.id}
                      />
                    ))}
                    {magic.placeholder}
                  </Area>
                );
              }}
            </Droppable>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='text'
                {...register('todo', {
                  required: true,
                })}
                placeholder={`+ Add to Card`}
              />
            </Form>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}

const Wrapper = styled.div<IWrapperProps>`
  background: ${props =>
    props.isDragging ? '#5758BB' : 'rgba(255, 255, 255, 0.7)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  overflow-y: scroll;
  flex: 0 0 calc(100% / 5 - 15px);
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out background;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  display: block;
  color: #fff;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  padding: 10px 30px 10px 10px;
`;
const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  background: ${props =>
    props.isDraggingOver
      ? props.theme.boardOverColor
      : props.draggingFromThisWith
      ? '#ED4C67'
      : null};
  transition: background 0.3s ease-in-out;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 190px);
  overflow: scroll;
  margin-bottom: 25px;
`;
const Form = styled.form`
  width: 100%;
  position: absolute;
  bottom: 3px;
  input {
    width: 100%;
    border: 0;
    height: 23px;
    padding: 0 20px;
    background: transparent;
    transition: 0.3s ease-in-out;
    position: relative;
    &:focus {
      outline: none;
      &::placeholder {
        color: ${props => props.theme.cardOverColor};
      }
    }
    &:focus + div {
      width: calc(100% - 40px);
    }
  }
  div {
    position: absolute;
    bottom: 0;
    left: 20px;
    width: 0px;
    height: 1px;
    background: ${props => props.theme.cardOverColor};
    transition: 0.3s width;
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    font-size: 15px;
    color: rgba(118, 118, 118);
    transition: 0.3s ease-in-out;
  }
  &:hover svg {
    color: #000;
  }
`;

export default React.memo(Board);
