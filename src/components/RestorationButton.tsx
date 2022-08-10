import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDosState, boardIndexState } from '../atoms';

const Input = styled.input`
  display: none;
`;
const Label = styled.label`
  position: fixed;
  top: 205px;
  right: 0;
  padding: 10.5px 0;
  width: 20%;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.5);
  transition: 0.3s ease-in-out;
  color: #fff;
  padding-left: 15px;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.5;
  }
`;

function RestorationButton() {
  const setBoard = useSetRecoilState(toDosState);
  const setBoardIndex = useSetRecoilState(boardIndexState);
  const onChange = async (event: React.FormEvent<HTMLInputElement>) => {
    if (
      !window.confirm(
        '데이터를 복원하시겠습니까? 현재 저장되어 있는 데이터는 사라집니다.',
      )
    )
      return;
    const file = event.currentTarget.files;
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const data = fileReader.result?.toString().split('<!-->');
      if (data?.length !== 2) return alert('복원 데이터가 아닙니다.');
      const a = data ? JSON.parse(data[0]) : '';
      const b = data ? JSON.parse(data[1]) : '';
      setBoard(a);
      setBoardIndex(b);
      localStorage.setItem('todos', JSON.stringify(a));
      localStorage.setItem('board', JSON.stringify(b));
    };
    fileReader.readAsText(file[0]);
  };
  return (
    <>
      <Input id='restoration' type='file' onChange={onChange} accept='.txt' />
      <Label htmlFor='restoration'>복원하기</Label>
    </>
  );
}
export default RestorationButton;
