import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";

import { executeAPIRequest } from "../utils/AxiosUtils";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    margin: "20px auto",
    padding: 20,
    border: "1px solid #FF8282",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const UpdatePokemon = () => {
  const styles = useStyles();

  const [updateId, setUpdateId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [updateAttack, setUpdateAttack] = useState("");
  const [updateHP, setUpdateHP] = useState("");
  const [updateResult, setUpdateResult] = useState("");
  const [helpText, setHelpText] = useState("");
  const [processing, setProcessing] = useState(false);

  const onIdChange = (event) => {
    setUpdateId(event.target.value);
  };

  const onNameChange = (event) => {
    setUpdateName(event.target.value);
  };

  const onTypeChange = (event) => {
    setUpdateType(event.target.value);
  };

  const onAttackChange = (event) => {
    setUpdateAttack(event.target.value);
  };

  const onHPChange = (event) => {
    setUpdateHP(event.target.value);
  };

  const onSuccess = (res) => {
    setHelpText("");
    setUpdateResult(res.data);
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
      name: updateName,
      type: updateType,
      attack: updateAttack,
      hitpoints: updateHP,
    };
    executeAPIRequest(
      "PUT",
      `/api/pokemon/${updateId}`,
      onSuccess,
      onError,
      requestData
    );
  };

  return (
    <div className={styles.container}>
      <h2>Update Pokemon</h2>
      <TextField
        value={updateId}
        onChange={onIdChange}
        label="Pokemon ID"
        variant="outlined"
      />
      <TextField
        value={updateName}
        onChange={onNameChange}
        label="Name"
        variant="outlined"
      />
      <TextField
        value={updateType}
        onChange={onTypeChange}
        label="Type"
        variant="outlined"
      />
      <TextField
        value={updateAttack}
        onChange={onAttackChange}
        type="number"
        label="Attack"
        variant="outlined"
      />
      <TextField
        value={updateHP}
        onChange={onHPChange}
        type="number"
        label="Hitpoints"
        variant="outlined"
      />
      <br />
      <Button onClick={onSubmit} variant="contained" disabled={processing}>
        PUT
      </Button>
      <h3>Results:</h3>
      <div>
        <span>{helpText}</span>
        {updateResult !== "" && (
          <p>Successfully updated: {JSON.stringify(updateResult)}</p>
        )}
      </div>
    </div>
  );
};

export default UpdatePokemon;
