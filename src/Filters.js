import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, MenuItem, FormControl, InputLabel, Select, TextField } from '@mui/material';
import { applyFilters } from './redux/actions';

function Filters() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    workType: '',
    techStack: '',
    role: '',
    minBasePay: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
 console.log(filters)
  const handleApplyFilters = () => {
    dispatch(applyFilters(filters));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="min-experience-label">Min Experience</InputLabel>
        <Select
          labelId="min-experience-label"
          id="min-experience"
          name="minExperience"
          value={filters.minExperience}
          label="Min Experience"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="0-10">0-1</MenuItem>
          <MenuItem value="0-10">2-4</MenuItem>
          <MenuItem value="0-10">5-7</MenuItem>
          <MenuItem value="0-10">8-10</MenuItem>
          <MenuItem value="0-10">10+</MenuItem>

          {/* Add more options as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Company Name"
        name="companyName"
        value={filters.companyName}
        onChange={handleChange}
      />
      <TextField
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="work-type-label">Work Type</InputLabel>
        <Select
          labelId="work-type-label"
          id="work-type"
          name="workType"
          value={filters.workType}
          label="Work Type"
          onChange={handleChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="On-site">On-site</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
      </FormControl>
      {/* Add select fields for Tech Stack, Role, and Min Base Pay similarly */}
      <Button onClick={handleApplyFilters} variant="contained" color="primary">
        Apply Filters
      </Button>
    </div>
  );
}

export default Filters;
