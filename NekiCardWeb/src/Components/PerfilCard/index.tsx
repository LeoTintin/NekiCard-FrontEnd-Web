import React from "react";
import {
  PerfilCardContainer,
  PerfilEmail,
  PerfilName,
  PerfilSocialName,
  DataNascimento,
  TelephoneNumber,
  RedeSocial
} from "./styles";
export default function PerfilCard() {
  return (
    <PerfilCardContainer>
      <img src={"/perfis/img_profile.svg"} />
      <PerfilEmail>leonardo.guerarti@neki-it.com.br</PerfilEmail>

      <PerfilName>Leonardo Guerarti Cunha</PerfilName>
      <PerfilSocialName>Leo</PerfilSocialName>
      <DataNascimento>12/12/1976</DataNascimento>
      <TelephoneNumber>(24)993197817</TelephoneNumber>
      <RedeSocial>Facebook</RedeSocial>
    </PerfilCardContainer>
  );
}
