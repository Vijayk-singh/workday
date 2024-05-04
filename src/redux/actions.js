export const FETCH_JOB_LISTINGS_SUCCESS = 'FETCH_JOB_LISTINGS_SUCCESS';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SEARCH_JOBS ='SEARCH_JOBS';
export const LOCATION_JOBS ='LOCATION_JOBS';
export const REMOTE_JOBS ='REMOTE_JOBS';
export const ROLE_JOBS ='ROLE_JOBS'

export const fetchJobListingsSuccess = (jobListings) => ({
  type: FETCH_JOB_LISTINGS_SUCCESS,
  payload: jobListings,
});

export const applyFilters = (filters) => ({
  type: APPLY_FILTERS,
  payload: filters,
});
export const searchJobs = (text) => {
  return {
    type: SEARCH_JOBS,
    payload: text,
  };
};
export const roleJobs = (text) => {
  return {
    type: ROLE_JOBS,
    payload: text,
  };
};
export const locationFilteredJobs = (text) => {
  return {
    type: LOCATION_JOBS,
    payload: text,
  };
};
export const locationRemoteJobs = (text) => {
  return {
    type: REMOTE_JOBS,
    payload: text,
  };
};
