// App.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobListingsSuccess } from "./redux/actions";
import Filters from "./components/Filters";
import {
  Slide,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  CardActions,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  CardMedia,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const jobListings = useSelector((state) => state.jobListings);
  const filteredJobs = useSelector((state) => state.filteredJobs);

  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track if data is currently being loaded
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job for popup

  const handleShowMore = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  useEffect(() => {
    fetchJobListings();
  }, [page]); // Fetch job listings when the page changes

  const fetchJobListings = () => {
    if (loading) return; // Prevent multiple API calls while data is being loaded
    setLoading(true); // Set loading state to true before making the API call
    fetch(
      `https://api.weekday.technology/adhoc/getSampleJdJSON?page=${page}&limit=100`,
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchJobListingsSuccess(data.jdList));
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state after API call completes
      });
  };

  // Function to handle infinite scroll
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setPage(page + 1); // Load more job listings when user reaches the bottom
    }
  };

  // Attach handleScroll function to window scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Re-run effect when loading state changes
  const myJobs = filteredJobs.length > 1 ? filteredJobs : jobListings;
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="rect" width={100} height={30} />
        <Skeleton variant="rect" width={100} height={30} />
        <Skeleton variant="rect" width={100} height={30} />
      </div>
      <Skeleton
        variant="rect"
        width="100%"
        height={3}
        style={{ marginTop: "10px" }}
      />
      <Skeleton
        variant="rect"
        width="100%"
        height={20}
        style={{ marginTop: "10px" }}
      />
      <Skeleton variant="rounded" animation="wave" width="100%" height={50}>
        {" "}
        <Skeleton variant="rounded" />
      </Skeleton>
      <Filters />
      <Container fixed>
        <Grid container spacing={4}>
          {filteredJobs.length > 0 ? (
            myJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card variant="outlined" sx={{ borderRadius: 5 }}>
                  <CardContent sx={{ margin: 1 }}>
                    <Chip
                      label="posted x days ago"
                      variant="outlined"
                      sx={{ marginBottom: 1, maxWidth: 1 }}
                    />
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 75, margin: 2, height: 75 }}
                        image="https://firebasestorage.googleapis.com/v0/b/weekday-works.appspot.com/o/referal-website-assets%2Ffavicon-64.png?alt=media"
                        alt="company logo"
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography variant="h5" component="h2">
                            {job.jobRole}
                          </Typography>
                          <Typography color="textSecondary">
                            Company: {job.company}
                          </Typography>
                          <Typography color="textSecondary">
                            Location: {job.location}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                    <h3> About Company: </h3>
                    <Typography variant="body2" component="p">
                      {job.jobDetailsFromCompany
                        .split(" ")
                        .slice(0, 60)
                        .join(" ")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: 35,
                        borderRadius: 5,
                        marginTop: "1rem",
                        textShadow: "2px -23px 92px 44px rgb(230,230,230,0.8)",
                        WebkitBoxShadow:
                          " 2px -23px 92px 44px rgb(230,230,230,0.8)",
                        MozBoxShadow:
                          "2px -23px 92px 44px rgb(230,230,230,0.8)",
                        backgroundColor: "rgb(240,240,240)",
                        color: "blue",
                        opacity: 0.6,
                      }}
                    >
                      <Button
                        onClick={() => handleShowMore(job)}
                        sx={{
                          color: "#3377FF",
                          cursor: "pointer",
                          fontWeight: "bold",
                          "&:hover": {
                            cursor: "pointer",
                            outline: "2px solid blue",
                            borderRadius: 5,
                            paddingLeft: 2,
                            paddingRight: 2,
                          },
                        }}
                      >
                        View Job
                      </Button>{" "}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Container>
                      <Stack>
                        <Grid item>
                          <Typography variant="subtitle1" gutterBottom>
                            Experience
                          </Typography>
                          <Typography color="textSecondary">
                            {job.experience}
                          </Typography>
                        </Grid>

                        <Grid item>
                          {/* <Button variant="contained"  sx={{width:'100%',height:55, fontStyle:'bold', paddingRight:10, paddingLeft:10,borderRadius:4, color:'black',backgroundColor: 'rgb(51,255,255)', '&:hover': {
                    backgroundColor: '#33FF99',
                    color:'white'
                  },}} startIcon={<BoltOutlinedIcon/>}>
                    Easy Apply
                  </Button> */}
                        </Grid>
                      </Stack>
                    </Container>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Container sx={{ display: "grid" }}>
              <Box
                component="section"
                sx={{
                  p: 2,
                  border: "1px dashed grey",
                  marginTop: "30px",
                  marginLeft: "30px",
                }}
              >
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                  <h3 sx={{}}>No Job Found????</h3>
                </Slide>
              </Box>
            </Container>
          )}
        </Grid>
        <Dialog open={selectedJob !== null} onClose={handleClosePopup}>
          <DialogContent>
            <Typography variant="h5" component="h2">
              {selectedJob?.jobRole}
            </Typography>
            <Typography color="textSecondary">
              Company: {selectedJob?.company}
            </Typography>
            <Typography color="textSecondary">
              Location: {selectedJob?.location}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {selectedJob?.jobDetailsFromCompany}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Typography></Typography>
            <Button onClick={handleClosePopup} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
