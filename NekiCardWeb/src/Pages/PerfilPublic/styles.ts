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
  width: 100%;
  max-width: 20rem;
  padding: 1.25rem;
  padding-top: 0;
  margin: 2rem auto;
  background: #ece8cb;
  border-radius: 6px 36px 6px 36px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: solid 1px #ea8720;

  img {
    width: 10rem;
    height: 10rem;
    margin-top: 1.25rem;
    border-radius: 8px;
  }
`;

export const PerfilPublicHeader = styled.div`
display:  flex;
justify-content: space-between;
`

export const PerfilBackButton = styled.button`
background-color: transparent;
color: #ea8720;
border: none;
margin-top: 1rem;

`

export const PublicPerfilTitle = styled.h1`
  color: #ea8720;
  font-weight: 700;
  margin-top: 1.625rem;
  font-size: 1.5rem;
`;

export const PerfilName = styled.h1`
  font-size: 1.5rem;
  color: #403937;
  margin-bottom: 0.5rem;
`;

export const PerfilEmail = styled.p`
  font-size: 0.875rem;
  color: #ece8cb;
  background: #ea8720;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const PerfilSocialName = styled.p`
  font-size: 1rem;
  color: #403937;
  margin-bottom: 0.75rem;
`;

export const DataNascimento = styled.p`
  font-size: 0.9rem;
  color: #403937;
  margin-bottom: 0.5rem;
`;

export const TelephoneNumber = styled.p`
  font-size: 0.9rem;
  color: #403937;
  margin-bottom: 0.5rem;
`;

export const RedeSocial = styled.a`
  font-size: 0.9rem;
  color: #ea8720;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    color: #d97706;
  }
`;
