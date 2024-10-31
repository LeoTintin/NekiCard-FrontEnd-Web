import styled from "styled-components";

export const ComponentButton = styled.button`
  padding: 10px 20px;
  color: #349c98;
  font-size: 1rem;
  transition: 0.4s;
  margin-top: 2rem;
  background: transparent;
  border: none;
  border-radius: 5px;
  letter-spacing: 0.25em;

  &:hover {
    background: #349c98;
    color: #fff;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px 16px;
  }
`;
