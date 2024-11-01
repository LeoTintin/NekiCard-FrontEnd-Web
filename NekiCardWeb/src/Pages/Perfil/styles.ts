import styled from "styled-components";

export const HomeContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2%;
`;

export const UserNotFound = styled.p`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.div`
  margin-top: 15rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  border: 4px solid;
  border-color: #349c98 #349c98 transparent;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled.div`
  position: absolute;
  margin-left: 12.4rem;
  top: 50%;

  @media (max-width: 415px) {
    margin-left: 18rem;
  }

  @media (max-width: 380px) {
    margin-left: 17rem;
  }
`;

export const SearchInput = styled.input`
  padding: 10px 0;
  font-size: 16px;
  color: #403937;
  margin-bottom: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #9d9c9a;
  outline: none;
  font-weight: 700;
  letter-spacing: 1px;

  &:focus {
    border-bottom: 1px solid #349c98;
  }

  &::placeholder {
    color: #403937;
  }

  @media (max-width: 415px) {
    margin-left: 3.3rem;
    width: 67%;
  }

  @media (max-width: 390px) {
    margin-left: 2.4rem;
    width: 74%;
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
