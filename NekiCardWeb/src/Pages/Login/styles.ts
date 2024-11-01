import styled from "styled-components";

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
`;

export const LoginWrapper = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  margin-left: 18rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 40%;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #349c98;
  margin-top: 30px;
  margin-bottom: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #9d9c9a;
  outline: none;

  &:focus {
    border-bottom: 1px solid #349c98;
  }
`;

export const ErrorSpam = styled.span`
  color: red;
  background: none;
  border: none;
`;
