import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDosState, boardIndexState } from '../atoms';

const Button = styled.button`
  position: fixed;
  top: 160px;
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
  &:hover {
    opacity: 0.5;
  }
`;

function SaveButton() {
  const a = useRecoilValue(toDosState);
  const b = useRecoilValue(boardIndexState);
  const onClick = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const timeString = hours + ':' + minutes + ':' + seconds;
    let fileName = `todoListDataBackUp(${dateString}/${timeString}).txt`;
    let output = `${JSON.stringify(a)}<!-->${JSON.stringify(b)}`;
    console.log(output.split('<!-->'));
    const element = document.createElement('a');
    const file = new Blob([output], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // FireFox
    element.click();
  };
  return <Button onClick={onClick}>Save Data</Button>;
}

export default SaveButton;
