import { ComponentButton } from "./styles";

export default function Button({ children, onClick }) {
  return <ComponentButton onClick={onClick}>{children}</ComponentButton>;
}
