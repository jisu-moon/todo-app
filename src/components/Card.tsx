import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div<ICardProps>`
  background: ${props => props.theme.cardColor};
  padding: 20px 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  opacity: ${props => (props.isDragging ? '0.5' : '1')};
  line-height: 1.2;
  font-size: 14px;
  position: relative;
  padding-bottom: 30px;
  padding-right: 20px;
  border-radius: 2px;
  margin: 3.5px 0;
  span {
    position: absolute;
    bottom: 2px;
    right: 5px;
    font-size: 11px;
    color: ${props => props.theme.bgColor};
  }
  svg {
    position: absolute;
    font-size: 15px;
    bottom: 50%;
    right: 3px;
  }
`;

interface IDraggableCardProps {
  todoTitle: string;
  todoId: number;
  index: number;
}
interface ICardProps {
  isDragging: boolean;
}

const dateZero = (date: number) => {
  if (date < 10) return `0${date}`;
  return date;
};

function Card({ todoTitle, todoId, index }: IDraggableCardProps) {
  const date = new Date(todoId);
  const onClick = () => {
    console.log('Sf');
  };
  return (
    <Draggable draggableId={todoId + ''} index={index}>
      {(magic, info) => {
        return (
          <Wrapper
            isDragging={info.isDragging}
            ref={magic.innerRef}
            {...magic.draggableProps}
            {...magic.dragHandleProps}
            onClick={onClick}
          >
            {todoTitle}
            <span>{`${date.getFullYear()}-${dateZero(
              date.getMonth() + 1,
            )}-${dateZero(date.getDate())} ${dateZero(
              date.getHours(),
            )}:${dateZero(date.getMinutes())}:${dateZero(
              date.getSeconds(),
            )}`}</span>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}
export default React.memo(Card);
