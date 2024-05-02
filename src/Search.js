import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function Search(props) {
  const data = props.data || ['a','b'];
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {/* <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={data.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      /> */}
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}


