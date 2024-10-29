import styled from "styled-components";

export const PerfilPublicContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
`;

export const PerfilPublicContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  text-align: center;

  img {
    width: 10rem;
    height: 10rem;
    margin-top: 1.25rem;
    border-radius: 8px;
  }
`;

export const PerfilPublicHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PerfilBackButton = styled.button`
  background-color: transparent;
  color: #ea8720;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  transition: 0.3s;
  padding: 8px;

  &:hover {
    background-color: #ea8720;
    color: #fff;
    border-radius: 8px;
  }
`;
