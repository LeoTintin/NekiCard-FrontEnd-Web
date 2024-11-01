import styled from "styled-components";

export const PerfilPublicContainer = styled.div`
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
`;

export const ProfileNotFoundContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  margin-left: auto;
  margin-right: auto;
`;

export const ProfileNotFound = styled.p`
  text-align: center;
  color: #349c98;
  font-weight: bold;
  font-size: 1.6rem;
  margin-top: 10rem;
`;

export const PerfilPublicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  @media (max-width: 1067px) {
    margin-left: 5%;
    margin-top: 15%;
  }

  @media (max-width: 915px) {
    margin-top: 20%;
  }
`;

export const PerfilPublicContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  text-align: center;

  img {
    width: 10rem;
    height: 10rem;
    margin-top: 1rem;
    border-radius: 8px;
  }

  @media (max-width: 915px) {
    margin-top: 30%;
  }
`;

export const Name = styled.h2`
  color: #403937;
  font-weight: 700;
  margin-top: 1.7rem;
  margin-right: auto;
  margin-left: 1rem;
`;

export const PerfilBackButton = styled.button`
  background-color: transparent;
  color: #349c98;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  transition: 0.3s;
  padding: 0px 11px 0px 11px;
  margin-left: auto;

  &:hover {
    background-color: #349c98;
    color: #fff;
    border-radius: 8px;
  }
`;
