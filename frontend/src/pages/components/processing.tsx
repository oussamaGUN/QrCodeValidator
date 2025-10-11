import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Processing() {
  return (
    <div style={{}}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress size={18} sx={{
          color: "#ef233c"
        }}/>
      </Box>
    </div>
  );
}

export default Processing;
