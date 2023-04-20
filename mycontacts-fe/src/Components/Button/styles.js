import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  border: none;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;


  outline: none;
  transition: background 0.2s ease-in;

  &:hover {
    background-color:  ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color:  ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger && css`
  background: ${theme.colors.danger.main};
  &:hover {
    background-color: ${theme.colors.danger.light};
  }

  &:active {
    background-color:   ${theme.colors.danger.dark};
  }
  `}

`;
