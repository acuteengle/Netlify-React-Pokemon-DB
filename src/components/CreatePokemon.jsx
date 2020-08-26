import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";

import { executeAPIRequest } from "../utils/AxiosUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    margin: "20px auto",
    padding: 20,
    border: "1px solid #9CFF89",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const CreatePokemon = () => {
  const styles = useStyles();

  const [createName, setCreateName] = useState("");
  const [createType, setCreateType] = useState("");
  const [createAttack, setCreateAttack] = useState("");
  const [createHP, setCreateHP] = useState("");
  const [createResult, setCreateResult] = useState("");
  const [helpText, setHelpText] = useState("");
  const [processing, setProcessing] = useState(false);

  const onNameChange = (event) => {
    setCreateName(event.target.value);
  };

  const onTypeChange = (event) => {
    setCreateType(event.target.value);
  };

  const onAttackChange = (event) => {
    setCreateAttack(event.target.value);
  };

  const onHPChange = (event) => {
    setCreateHP(event.target.value);
  };

  const onSuccess = (res) => {
    setHelpText("");
    setCreateResult(res.data);
    setProcessing(false);
  };

  const onError = (err) => {
    setHelpText("An error occured...");
    console.log(err);
  };

  const onSubmit = (event) => {
    setProcessing(true);
    setHelpText("Loading...");
    const requestData = {
      name: createName,
      type: createType,
      attack: createAttack,
      hitpoints: createHP,
    };
    executeAPIRequest("POST", "/api/pokemon", onSuccess, onError, requestData);
  };

  return (
    <div className={styles.container}>
      <h2>Create Pokemon</h2>
      <TextField
        value={createName}
        onChange={onNameChange}
        label="Name"
        variant="outlined"
      />
      <TextField
        value={createType}
        onChange={onTypeChange}
        label="Type"
        variant="outlined"
      />
      <TextField
        value={createAttack}
        onChange={onAttackChange}
        type="number"
        label="Attack"
        variant="outlined"
      />
      <TextField
        value={createHP}
        onChange={onHPChange}
        type="number"
        label="Hitpoints"
        variant="outlined"
      />
      <br />
      <Button onClick={onSubmit} variant="contained" disabled={processing}>
        POST
      </Button>
      <h3>Results:</h3>
      <div>
        <span>{helpText}</span>
        {createResult !== "" && (
          <p>Successfully created: {JSON.stringify(createResult)}</p>
        )}
      </div>
    </div>
  );
};

export default CreatePokemon;
