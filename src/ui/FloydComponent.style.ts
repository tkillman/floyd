import styled from 'styled-components';

export const FloydComponentWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: 90vw;
  overflow-x: auto;
  @media (min-width: 1024px) {
    width: fit-content;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
