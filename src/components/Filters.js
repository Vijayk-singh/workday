// Filters.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationFilteredJobs, searchJobs,locationRemoteJobs, roleJobs } from "../redux/actions";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Container,
  Box,
  Grid,
  Autocomplete,
  Divider,
  InputBase
} from "@mui/material";
import { applyFilters } from "../redux/actions";
import SelectChip from "./SelectChip";
import CheckboxesTags from "./CheckBoxesTags";


  const handleSearchInputClick = (event) => {
    // Prevent click event from propagating to parent Accordion
    event.stopPropagation();
  };
function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // const handleChange = (e) => {
  //   const { name, value } = e.target.value;
  //   dispatch(applyFilters({ ...filters, [name]: value }));
  // };
  // const jobListings = useSelector((state) => state.jobListings);
  const data = ["Frontend", "Backend", "Android", "Tech Lead"];

 
  const handleSearch = (e) => {
    const searchText = e.target.value;
  dispatch(searchJobs(searchText));
  };
  // const handleLocation = (e) => {
  //   const searchText = e.target.value;
  // dispatch(locationFilteredJobs(searchText));
  // };
  
  return (
    <div style={{ marginBottom: '10px' , marginTop: '10px' }}>
      <Container>
      <Accordion  component="form"
      sx={{ p: '2px 0px',  alignItems: 'center', width: '100%', borderRadius:"15px" }}>
        <AccordionSummary
          expandIcon={<FilterListIcon  color="primary" />}
          aria-controls="panel1-content"
          id="panel1-header"
          label="gfhgh"
        > 
            {/* <TextField label="Filled success" variant="filled" color="success" focused />  */}
          <InputBase
           focused
           variant="outline"
            type="text"
            placeholder="Search Jobs"
            onChange={handleSearch}
            sx={{ p: '2px 4px',  alignItems: 'center', width: '85%',borderRadius:"15px" }}
            onClick={ handleSearchInputClick}
          /><Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /><Button variant="text" sx={{marginLeft:"20px"}}>Filters</Button>
        </AccordionSummary>
        <AccordionDetails>

        <Box display="flex" flexDirection="column" gap={2}>
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="location-label" size="small">
                  Location Type
                </InputLabel>
                <Select
                  labelId="location-label"
                  id="location-label"
                  label="Location-Type"
                  name="location"
                  value={filters.remote || ""}
                  onChange={(e, selectedOptions) => {
                    dispatch(applyFilters({ ...filters, remote: e.target.value }))
                    dispatch(locationRemoteJobs(selectedOptions));
                  }}
                  size="small"
                >
                  
                  <MenuItem value="true">Remote</MenuItem>
                  <MenuItem value="false">ALL</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="min-experience-label" size="small">
                  Min Experience
                </InputLabel>
                <Select
                  labelId="min-experience-label"
                  id="min-experience"
                  name="minExperience"
                  value={(filters.minExperience || "")}
                  label="Min Experience"
                 onChange={(e) => dispatch(applyFilters({ ...filters, minExperience: e.target.value }))}
                  size="small"
                  disabled
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="1">1 Year</MenuItem>
                  <MenuItem value="2">2 Years</MenuItem>
                  <MenuItem value="3">3 Years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="min-basepay-label" size="small">
                  Min BasePay
                </InputLabel>
                <Select
                  labelId="min-basepay-label"
                  id="min-basepay"
                  name="minBasePay"
                  value={filters.minBasePay || ""}
                  label="Min BasePay"
                 onChange={(e) => dispatch(applyFilters({ ...filters, minBasePay: e.target.value }))}
                  size="small"
                  disabled
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="2">2L</MenuItem>
                  <MenuItem value="3">3L</MenuItem>
                  <MenuItem value="4">4L</MenuItem>
                  <MenuItem value="5">5L</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
            <SelectChip name="Job-Role" data={data} onChange={(e, selectedOptions) => {
                    // dispatch(applyFilters({ ...filters, role: e.target.value }))
                    dispatch(roleJobs(selectedOptions));
                  }} fullWidth />
             
            </Grid>
            <Grid item xs={12} md={4}>
              <CheckboxesTags
                name="Techstack"
                data={['ReactJS','NodeJS','SQL','MongoDB']}
                fullWidth
                onChange={(e) => dispatch(applyFilters({ ...filters, minBasePay: e.target.value }))}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
             
              <Autocomplete
    size='samll'
      multiple
      limitTags={2}
      id="size-small-filled-multi"
      options={["Delhi NCR", "Banglore","Telangana","Pune","Mumbai"]}
      getOptionLabel={(option) => option}
      sx={{ minWidth: 300 }}
      // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
      renderInput={(params) => (
        <TextField {...params} label="Location" placeholder="" limitTags={2}
        id="multiple-limit-tags" size='small' type="text" 
        />
      )}
      onChange={(e, selectedOptions) => {
        // const selectedLocations = selectedOptions.map((option) => option);
        dispatch(locationFilteredJobs(selectedOptions));
      }}
    />
            </Grid>
          </Grid>
        
        </Box>
        </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  );
}

export default Filters;
