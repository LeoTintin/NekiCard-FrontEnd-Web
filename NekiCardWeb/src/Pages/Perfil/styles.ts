import styled from "styled-components";

export const HomeContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
`;

export const PerfilTitle = styled.h1`
 color: #ea8720;
 font-weight: 700;
 margin-top: 1.625rem;
`

export const PerfilList = styled.div`
  margin-top: 3rem;
  margin-left: 8rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

export const HomeButton = styled.button`
  padding: 10px 20px;
  color: #ea8720;
  font-size: 16px;
  transition: 0.4s;
  margin-top: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  letter-spacing: 4px;

  &:hover {
    background: #ea8720;
    color: #fff;
    border-radius: 5px;
  }
`;
