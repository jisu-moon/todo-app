import { atom } from 'recoil';

export interface ItoDos {
  [key: string]: IToDos[];
}

export interface IToDos {
  id: number;
  title: string;
}

interface IModal {
  show: boolean;
  boardId: string;
}

let localTodos = localStorage.getItem('todos');
let localBoard = localStorage.getItem('board');
if (localTodos === null || localBoard === null) {
  localStorage.setItem('todos', JSON.stringify({}));
  localStorage.setItem('board', JSON.stringify([]));
  localTodos = localStorage.getItem('todos');
  localBoard = localStorage.getItem('board');
}
const parseTodos = JSON.parse(localTodos as any);
const parseBoard = JSON.parse(localBoard as any);

export const toDosState = atom<ItoDos>({
  key: 'todos',
  default: parseTodos,
});

export const boardIndexState = atom<string[]>({
  key: 'boardIndex',
  default: parseBoard,
});

export const modalState = atom<IModal>({
  key: 'modal',
  default: {
    show: false,
    boardId: '',
  },
});
