import styled from "styled-components";

export const ResgisterContainer = styled.div`
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

export const ResgisterTitle = styled.h2`
  padding: 0;
  color: #ea8720;
  text-align: center;
`;

export const NameFormInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const NameResgisterInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #ea8720;
  margin-bottom: 20px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #deddc2;
  outline: none;
`;

export const ResgisterInput = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #ea8720;
  margin-bottom: 20px;
  border: none;
  background: transparent;
  border-bottom: 1px solid #deddc2;
  outline: none;

  &:focus {
    border-bottom: 1px solid #ea8720;
  }
`;

export const RegisterButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ea8720;
  font-size: 16px;
  transition: 0.4s;
  margin-top: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  letter-spacing: 4px;

  &:hover {
    background: #ea8720;
    color: #fff;
    border-radius: 5px;
  }
`;

export const ErrorSpam = styled.span`
  color: red;
  background: none;
  border: none;
`;
