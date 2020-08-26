import React from "react";
import GetPokemon from "./GetPokemon";
import CreatePokemon from "./CreatePokemon";
import UpdatePokemon from "./UpdatePokemon";

// https://www.codementor.io/@ekunolaeasybuoy/deploying-react-app-from-github-to-netlify-xob6bhhxu

const PokemonForm = () => {
  //   const [createName, setCreateName] = useState("");

  return (
    <div>
      <GetPokemon />
      <CreatePokemon />
      <UpdatePokemon />
    </div>
  );
};

export default PokemonForm;
