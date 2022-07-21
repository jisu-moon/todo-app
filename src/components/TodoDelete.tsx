import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Wrapper = styled.div<IDeleteProps>`
  position: fixed;
  top: 115px;
  right: 0;
  padding: 10.5px 0;
  width: 20%;
  border-radius: 2px;
  background: ${props =>
    props.isDraggingOver ? '#fff' : 'rgba(255,255,255,0.5)'};
  transition: 0.3s ease-in-out;
  color: ${props => (props.isDraggingOver ? '#000' : '#fff')};
  padding-left: 15px;
  svg {
    transition: 0.3s ease-in-out;
    font-size: 15px;
    color: ${props => (props.isDraggingOver ? '#000' : '#fff')};
  }
  span {
    font-size: 14px;
  }
`;

interface IDeleteProps {
  isDraggingOver: boolean;
}

function TodoDelete() {
  return (
    <Droppable droppableId='delete' type='todo'>
      {(magic, info) => {
        return (
          <Wrapper
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={info.isDraggingOver}
          >
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            <span> Delete to Card</span>
          </Wrapper>
        );
      }}
    </Droppable>
  );
}

export default TodoDelete;
