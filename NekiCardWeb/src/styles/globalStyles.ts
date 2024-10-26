import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #deddc2;
  }

  button{
    cursor: pointer;
  }

  body,input,textarea,button{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  } 
 
`;
