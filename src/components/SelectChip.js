import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SelectChip(props) {
  return (
    <Autocomplete
    size='samll'
      multiple
      limitTags={2}
      id="size-small-filled-multi"
      options={props.data}
      getOptionLabel={(option) => option}
      sx={{ minWidth: 300 }}
      onChange={props.onChange}
      // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
      renderInput={(params) => (
        <TextField {...params} label={props.name} placeholder="" limitTags={2}
        id="multiple-limit-tags" size='small' />
      )}
     
    />
  );
}


