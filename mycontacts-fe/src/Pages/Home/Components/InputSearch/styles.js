import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  input {
    width: 100%;
    background-color: #fff;
    border-radius: 25px;
    border:none;
    height: 50px;
    outline: 0;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
    padding: 0 16px;

    &::placeholder{
      color: #bcbcbc;
    }
  }
`;
