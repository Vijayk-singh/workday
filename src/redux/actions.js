// redux/actions.js
export const FETCH_JOB_LISTINGS_SUCCESS = 'FETCH_JOB_LISTINGS_SUCCESS';
export const APPLY_FILTERS = 'APPLY_FILTERS';

export const fetchJobListingsSuccess = (jobListings) => ({
  type: FETCH_JOB_LISTINGS_SUCCESS,
  payload: jobListings,
});

export const applyFilters = (filters) => ({
  type: APPLY_FILTERS,
  payload: filters,
});
