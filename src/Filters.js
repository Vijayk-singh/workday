import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Container,
  Box,
} from "@mui/material";
import { applyFilters } from "./redux/actions";

function Filters() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    workType: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });

  const jobs = useSelector((state) => state.jobListings);

  const allminExperiance = new Set();
  const allcompany = new Set();
  const alllocation = new Set();
  const allremote = ["Remote", "On-Site"];
  const alltechStack = new Set();
  const allrole = new Set();
  const allminBase = new Set();
  jobs.forEach((e) => {
    alllocation.add(e.location);
    allcompany.add(e.company);
    allrole.add(e.jobRole);
    allminExperiance.add(e.experiance);
  });
  const locationarr = Array.from(alllocation);
  const experiancearr = Array.from(allminExperiance);
  const rolearr = Array.from(allrole);
  
  console.log("heloo", locationarr);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  console.log(filters);
  const handleApplyFilters = () => {
    dispatch(applyFilters(filters));
  };

  return (
    <div>
      <Container>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="min-experience-label">Min Experience</InputLabel>
            <Select
              sx={{ height: 40 }}
              labelId="min-experience-label"
              id="min-experience"
              name="minExperience"
              value={filters.minExperience}
              label="Min Experience"
              onChange={handleChange}
            >
                <MenuItem value="All">All</MenuItem>
              {experiancearr.map((e) => (
                <MenuItem value={e} label={e}>
                  {e}
                </MenuItem>
              ))}

              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="location-label">Location</InputLabel>
            <Select
              sx={{ height: 40 }}
              labelId="location-label"
              id="location-label"
              label="Location"
              name="location"
              value={filters.location} // Set the value of the select dropdown to the location filter state
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              {locationarr.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="work-type-label">Work Type</InputLabel>
            <Select
              sx={{ height: 40 }}
              labelId="work-type-label"
              id="work-type"
              name="workType"
              value={filters.workType}
              label="Work Type"
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="On-site">On-site</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="techstack-label">Techstack</InputLabel>
            <Select
              sx={{ height: 40 }}
              labelId="techstack-label"
              id="techstack-label"
              label="Techstack"
              name="techstack"
              value={filters.location} // Set the value of the select dropdown to the location filter state
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              {/* {locationarr.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="work-type-label">Role</InputLabel>
            <Select
              sx={{ height: 40 }}
              labelId="role-label"
              id="role-type"
              name="roletype"
              value={filters.workType}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              {rolearr.map((e) => (
                <MenuItem value={e} label={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl></FormControl>
          {/* Add select fields for Tech Stack, Role, and Min Base Pay similarly */}
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            color="primary"
          >
            Apply Filters
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Filters;
