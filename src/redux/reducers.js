// redux/reducers.js
import { FETCH_JOB_LISTINGS_SUCCESS, APPLY_FILTERS } from './actions';

const initialState = {
  jobListings: [],
  filters: {
    minExperience: 0,
    companyName: '',
    location: '',
    remote: false,
    techStack: '',
    role: '',
    minBasePay: 0,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_LISTINGS_SUCCESS:
      return {
        ...state,
        jobListings: [...state.jobListings, ...action.payload],
      };
    case APPLY_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
