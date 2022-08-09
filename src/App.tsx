import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardIndexState, toDosState } from './atoms';
import Board from './components/Board';
import BoardCreate from './components/BoardCreate';
import TodoDelete from './components/TodoDelete';
import Modal from './components/Modal';
import { useEffect } from 'react';
import SaveButton from './components/SaveButton';

const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  height: calc(100vh - 70px);
  padding: 10px;
  margin-top: 70px;
  padding-right: calc(20% + 5px);
`;
const Boards = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  height: 100%;
  overflow-y: scroll;
`;

function App() {
  const [todos, setTodos] = useRecoilState(toDosState);
  const [boardIndex, setBoardIndex] = useRecoilState(boardIndexState);
  const onDragEnd = (info: DropResult) => {
    const { source, destination } = info;
    if (!destination) return;
    switch (info.type) {
      case 'todo':
        if (destination.droppableId === 'delete') {
          setTodos(allBoards => {
            const sourceBoard = [...allBoards[source.droppableId]];
            sourceBoard.splice(source.index, 1);
            const result = {
              ...allBoards,
              [source.droppableId]: sourceBoard,
            };
            localStorage.setItem('todos', JSON.stringify(result));
            return result;
          });
        } else if (destination.droppableId !== source.droppableId) {
          setTodos(allBoards => {
            const sourceBoard = [...allBoards[source.droppableId]];
            const moveTodo = sourceBoard.splice(source.index, 1)[0];
            const destinationBoard = [...allBoards[destination.droppableId]];
            destinationBoard.splice(destination.index, 0, moveTodo);
            const result = {
              ...allBoards,
              [source.droppableId]: sourceBoard,
              [destination.droppableId]: destinationBoard,
            };
            localStorage.setItem('todos', JSON.stringify(result));
            return result;
          });
        } else {
          setTodos(allBoards => {
            const sourceBoard = [...allBoards[source.droppableId]];
            const moveTodo = sourceBoard.splice(source.index, 1)[0];
            sourceBoard.splice(destination.index, 0, moveTodo);
            const result = {
              ...allBoards,
              [source.droppableId]: sourceBoard,
            };
            localStorage.setItem('todos', JSON.stringify(result));
            return result;
          });
        }
        break;
      case 'board':
        setBoardIndex(allBoardIndex => {
          const sourceBoard = [...allBoardIndex];
          const moveBoard = sourceBoard.splice(source.index, 1)[0];
          sourceBoard.splice(destination.index, 0, moveBoard);
          localStorage.setItem('board', JSON.stringify(sourceBoard));
          return sourceBoard;
        });
    }
  };
  useEffect(() => {
    const a = localStorage.getItem('todos');
    const b = localStorage.getItem('board');
    a ?? b ?? localStorage.setItem('board', JSON.stringify([]));
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId='boards' direction='horizontal' type='board'>
            {magic => {
              return (
                <>
                  <Boards ref={magic.innerRef} {...magic.droppableProps}>
                    {boardIndex.map((boardId, index) => (
                      <Board
                        todos={todos[boardId]}
                        boardId={boardId}
                        index={index}
                        key={boardId}
                      />
                    ))}
                  </Boards>
                </>
              );
            }}
          </Droppable>
          <BoardCreate />
          <TodoDelete />
          <SaveButton />
          <Modal />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
