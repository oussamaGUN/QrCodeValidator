import React from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

function mui() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button variant="contained" startIcon={<SaveIcon />}>
        Save
      </Button>

      <Button variant="outlined" endIcon={<SaveIcon />}>
        Next
      </Button>
    </>
  );
}

export default mui;
