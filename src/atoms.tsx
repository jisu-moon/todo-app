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

const localTodos: string | {} = localStorage.getItem('todos') ?? {};
const parseTodos = JSON.parse(localTodos as any);
const localBoard = localStorage.getItem('board') ?? [];
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
