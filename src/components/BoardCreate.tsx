import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { boardIndexState, toDosState } from '../atoms';

const Form = styled.form`
  position: fixed;
  top: 70px;
  right: 0;
  color: #fff;
  text-align: left;
  width: 20%;
  input {
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    padding: 10.5px 0;
    font-size: 14px;
    padding-left: 20px;
    border-radius: 2px;
    border: 0;
    border: 0;
    transition: 0.3 ease-in-out;
    &::placeholder {
      color: #fff;
    }
    &:focus {
      outline: none;
      background: #fff;
      &::placeholder {
        color: #000;
      }
    }
  }
`;

interface IForm {
  boardTitle: string;
}

function BoardCreate() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(toDosState);
  const setBoradIndex = useSetRecoilState(boardIndexState);
  const onSubmit = ({ boardTitle }: IForm) => {
    setTodos(allBoards => {
      if (Boolean(Object.keys(allBoards).find(board => boardTitle === board)))
        return allBoards;
      const result = { ...allBoards, [boardTitle]: [] };
      localStorage.setItem('todos', JSON.stringify(result));
      return result;
    });
    setBoradIndex(allBoards => {
      if (allBoards.find(board => boardTitle === board)) return allBoards;
      const result = [...allBoards, boardTitle];
      localStorage.setItem('board', JSON.stringify(result));
      return result;
    });
    setValue('boardTitle', '');
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('boardTitle', {
          required: true,
        })}
        placeholder={`+ Add to List`}
      />
    </Form>
  );
}

export default BoardCreate;
