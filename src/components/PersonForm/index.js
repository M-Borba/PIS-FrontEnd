import React, { useState } from "react";
import propTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

PersonForm.propTypes = {
  onSubmit: propTypes.func,
  onInputChange: propTypes.func,
  person: propTypes.shape({
    first_name: propTypes.string,
    last_name: propTypes.string,
    email: propTypes.string,
    working_hours: propTypes.number,
  }).isRequired,
  msg: propTypes.string,
  error: propTypes.string,
  title: propTypes.string,
};

export default function PersonForm({
  title,
  onSubmit,
  onInputChange,
  person,
  error,
  msg,
}) {
  const classes = useStyles();
  const [formRoles, setFormRoles] = useState([{ rol: "" }])

  let handleChange = (i, e) => {
    let newFormRoles = [...formRoles];
    newFormRoles[i][e.target.name] = e.target.value;
    setFormRoles(newFormRoles);
  }

  let addFormFields = () => {
    setFormRoles([...formRoles, { rol: "" }])
  }

  let removeFormFields = (i) => {
    let newFormRoles = [...formRoles];
    newFormRoles.splice(i, 1);
    setFormRoles(newFormRoles)
  }

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <Typography className={classes.msg} component="h2">
        {msg}
      </Typography>
      <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="first_name"
          type="text"
          label="Nombre"
          name="first_name"
          value={person.first_name}
          onChange={onInputChange}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="last_name"
          type="text"
          label="Apellidos"
          name="last_name"
          value={person.last_name}
          onChange={onInputChange}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          type="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={person.email}
          onChange={onInputChange}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="working_hours"
          label="Horas"
          type="number"
          id="working_hours"
          value={person.working_hours}
          onChange={onInputChange}
        />
        {formRoles.map((element, index) => (
          <Grid container key={index} style={{ paddingTop: 10, paddingBo: 10 }}>
            {
              index ?
                <>
                  <TextField
                    style={{ paddingRight: 14 }}
                    variant="outlined"
                    name="role"
                    label="Rol"
                    type="text"
                    id="rol"
                    value={element.name}
                    onChange={e => handleChange(index, e)} />
                  <Button
                    variant="outlined"
                    onClick={() => removeFormFields(index)}
                  >
                    Quitar
                  </Button>
                </>
                : null
            }
          </Grid>

        ))}
        <div style={{ paddingTop: 10 }} />
        <Button variant="outlined" className="button add" onClick={() => addFormFields()}>Agregar Rol</Button>
        <Button
          role="submit"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Guardar
        </Button>

        <Typography className={classes.errorMsg} component="h2">
          {error}
        </Typography>

        <Box mt={5}></Box>
      </form>
    </div >
  );
}
