import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";

import { executeAPIRequest } from "../utils/AxiosUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    margin: "20px auto",
    padding: 20,
    border: "1px solid #7FE6FF",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: 5,
  },
}));

const GetPokemon = () => {
  const styles = useStyles();

  const [getId, setGetId] = useState("");
  const [getResults, setGetResults] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [helpText, setHelpText] = useState("");

  const onIdChange = (event) => {
    setGetId(event.target.value);
  };

  const onSuccess = (res) => {
    setHelpText("");
    setGetResults(res.data);
    setProcessing(false);
  };

  const onError = (err) => {
    setHelpText("An error occured...");
    console.log(err);
  };

  const onSubmit = (event) => {
    setProcessing(true);
    setHelpText("Loading...");
    let url = "/api/pokemon";
    if (getId !== "") {
      url = url + `/${getId}`;
    }
    executeAPIRequest("GET", url, onSuccess, onError);
  };

  return (
    <div className={styles.container}>
      <h2>Get Pokemon</h2>
      <TextField
        value={getId}
        onChange={onIdChange}
        label="Pokemon ID"
        variant="outlined"
        className={styles.input}
      />
      <Button onClick={onSubmit} variant="contained" disabled={processing}>
        GET
      </Button>
      <h3>Results:</h3>
      <div>
        <span>{helpText}</span>
        {getResults.length === 0 && helpText === "" ? (
          <p>(None)</p>
        ) : (
          getResults.map((pokemon) => {
            return <p key={pokemon.id}>{JSON.stringify(pokemon)}</p>;
          })
        )}
      </div>
    </div>
  );
};

export default GetPokemon;
