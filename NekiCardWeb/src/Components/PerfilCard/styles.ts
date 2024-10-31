import styled from "styled-components";

export const PerfilCardContainer = styled.div`
  width: 100%;
  max-width: 15rem;
  background: #fff;
  border-radius: 6px 36px 36px 36px;
  padding: 1.25rem;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: solid 1px #349c98;
`;

export const PerfilId = styled.p`
  color: #349c98;
  background-color: #fff;
  border: solid 1px #349c98;
  font-size: 13px;
  font-weight: bold;
  padding: 10px;
  border-radius: 50%;
  margin-top: -0.8rem;
  margin-right: 17rem;
  z-index: 1;
`;

export const PerfilRedirectButton = styled.button`
  background: none;
  border: none;
`;

export const PerfilImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  margin-top: 1.25rem;
  border-radius: 8px;
`;

export const PerfilEmail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 0.75rem;
  margin-bottom: -0.5rem;
  flex-wrap: wrap;
  background: #349c98;
  color: #fff;
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
  color: #349c98;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PerfilButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #349c98;
  transition: 0.3s;
  padding: 0.3rem 0.4rem 0.2rem 0.4rem;

  &:hover {
    background-color: #349c98;
    color: #fff;
    border-radius: 8px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  height: 85%;
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    color: #403937;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #349c98;
  font-size: 1.5rem;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #9d9c9a;
    font-size: 1rem;
    color: #349c98;
    background-color: transparent;

    &:focus {
      outline: none;
      border-color: #349c98;
    }

    &::placeholder {
      color: #403937;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 10px 20px;
    color: #349c98;
    font-size: 16px;
    transition: 0.4s;
    margin-top: 30px;
    background: transparent;
    border: none;
    letter-spacing: 4px;

    &:hover {
      background: #349c98;
      color: #fff;
      border-radius: 5px;
    }
  }
`;
export const FileInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconButton = styled.button`
  background-color: transparent;
  padding: 0;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  align-items: center;
`;

export const ImagePreview = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #349c98;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
