import styled from "styled-components";

export const HomeContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2%;
`;

export const SearchInput = styled.input`
  padding: 10px 0;
  font-size: 16px;
  color: #403937;
  margin-bottom: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #deddc2;
  outline: none;
  font-weight: 700;
  letter-spacing: 1px;

  &:focus {
    border-bottom: 1px solid #ea8720;
  }

  &::placeholder {
    color: #403937;
  }
`;

export const PerfilList = styled.div`
  margin-left: 7%;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;

  @media (max-width: 1067px) {
    margin-left: 5%;
    gap: 30px;
  }

  @media (max-width: 1024px) {
    margin-left: 4%;
    gap: 20px;
  }

  @media (max-width: 1000px) {
    margin-left: 18%;
    gap: 50px;
  }

  @media (max-width: 870px) {
    margin-left: 10%;
    gap: 50px;
  }

  @media (max-width: 770px) {
    gap: 30px;
  }

  @media (max-width: 700px) {
    margin-left: 6%;
    gap: 20px;
  }

  @media (max-width: 670px) {
    margin-left: 3%;
  }

  @media (max-width: 665px) {
    margin-left: 3%;
  }

  @media (max-width: 430px) {
    margin-left: 13%;
  }

  @media (max-width: 390px) {
    margin-left: 10%;
  }
`;
