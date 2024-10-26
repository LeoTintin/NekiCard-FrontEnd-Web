import styled from "styled-components";

export const PerfilCardContainer = styled.div`
  width: 100%;
  max-width: 300px;
  background: #ece8cb;
  border-radius: 6px 36px 6px 36px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: solid 1px #ea8720;
  overflow: hidden;
  box-sizing: border-box;

  img {
    width: 7.5rem;
    height: 7.5rem;
    margin-top: 1.25rem;
    border-radius: 8px;
  }
`;

export const PerfilEmail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 0.75rem;
  margin-bottom: -0.5rem;
  flex-wrap: wrap;
  background: #ea8720;
  color: #ece8cb;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-weight: 700;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export const PerfilName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: -1rem; 
  word-wrap: break-word;
  max-width: 100%;
  color: #403937;
`;

export const PerfilSocialName = styled.p`
  font-size: medium;
  margin-bottom: 0.625rem; 
  word-wrap: break-word;
  max-width: 100%;
  color: #403937;
`;

export const DataNascimento = styled.p`
  font-size: medium;
  margin: 0;
  margin-bottom: 0.25rem;
  word-wrap: break-word;
  max-width: 100%;
  color: #403937;
`;

export const TelephoneNumber = styled.p`
  font-size: medium;
  margin: 0;
  margin-bottom: 0.5rem;
  word-wrap: break-word;
  max-width: 100%;
  color: #403937;
`;

export const RedeSocial = styled.a`
  font-size: medium;
  margin: 1;
  word-wrap: break-word;
  max-width: 100%;
  color: #ea8720;
  cursor: pointer;
`