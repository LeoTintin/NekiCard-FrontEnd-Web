import styled from "styled-components";

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #ece8cb;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
`;

export const LoginTitle = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #403937;
  text-align: center;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #ea8720;
  margin-bottom: 30px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #deddc2;
  outline: none;

  &:focus {
    border-bottom: 1px solid #ea8720;
  }

  &::placeholder {
    color: #403937;
  }
`;

export const ErrorSpam = styled.span`
  color: red;
  background: none;
  border: none;
`;

export const LoginButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ea8720;
  font-size: 16px;
  transition: 0.4s;
  margin-top: 30px;
  background: transparent;
  border: none;
  letter-spacing: 4px;

  &:hover {
    background: #ea8720;
    color: #fff;
    border-radius: 5px;
  }
`;
