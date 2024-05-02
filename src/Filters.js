import React from "react";
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
import SelectChip from "./SelectChip";
import CheckboxesTags from "./CheckBoxesTags";

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(applyFilters({ ...filters, [name]: value }));
  };

  const data = ["Frontend", "Backend", "Android", "Tech Lead"];

  return (
    <div>
      <Container>
        <Box display="flex" flexDirection="column" gap={2}>
         

          <Box display="flex" gap={2} >
            <SelectChip name="role" data={data} />

            <CheckboxesTags name="Techstack" data={data} />

            <SelectChip name="Location Type" data={["Remote", "In-Office"]} />
          </Box>

          <Box display="flex" alignItems="center" justifyContent="" gap={2} sx={{marginBottom:5}}>
            <TextField
              label="Search Company"
              name="search"
              value={filters.search}
              onChange={handleChange}
              size="small"
            />
 <Box display="flex" alignItems="center" gap={1}>
            <FormControl>
              <InputLabel id="location-label" size="small">
                Location
              </InputLabel>
              <Select
                labelId="location-label"
                id="location-label"
                label="Location"
                name="location"
                value={filters.location || ""}
                onChange={handleChange}
                size="small"
                sx={{ minWidth: "150px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Delhi NCR">Delhi NCR</MenuItem>
                <MenuItem value="Banglore">Banglore</MenuItem>
                <MenuItem value="Telngana">Telngana</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="min-experience-label" size="small">
                Min Experience
              </InputLabel>
              <Select
                labelId="min-experience-label"
                id="min-experience"
                name="minExperience"
                value={filters.minExperience || ""}
                label="Min Experience"
                onChange={handleChange}
                size="small"
                sx={{ minWidth: "150px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="1">1 Year</MenuItem>
                <MenuItem value="2">2 Years</MenuItem>
                <MenuItem value="3">3 Years</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="min-basepay-label" size="small">
                Min BasePay
              </InputLabel>
              <Select
                labelId="min-basepay-label"
                id="min-basepay"
                name="minBasePay"
                value={filters.minBasePay || ""}
                label="Min BasePay"
                onChange={handleChange}
                size="small"
                sx={{ minWidth: "150px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="2L">2L</MenuItem>
                <MenuItem value="3L">3L</MenuItem>
                <MenuItem value="4L">4L</MenuItem>
                <MenuItem value="5L">5L</MenuItem>
              </Select>
            </FormControl>
          </Box>
            {/* <Button
              onClick={() => dispatch(applyFilters(filters))}
              variant="contained"
              color="primary"
            >
              Apply Filters
            </Button> */}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Filters;
