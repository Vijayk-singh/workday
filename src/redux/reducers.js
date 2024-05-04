// import { FETCH_JOB_LISTINGS_SUCCESS, APPLY_FILTERS ,SEARCH_JOBS} from './actions';

const initialState = {
  jobListings: [],
  filteredJobs: [], // Fixing the variable name
  filters: {
    minExperience: 0,
    companyName: '',
    location: [],
    remote: false,
    techStack: '',
    role: '',
    minBasePay: 0,
    search: ''
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_JOB_LISTINGS_SUCCESS":
      return {
        ...state,
        jobListings: [...state.jobListings, ...action.payload],
        filteredJobs: [...state.jobListings, ...action.payload], // Update filteredJobs as well
      };
    case "APPLY_FILTERS":
      console.log(state.filters);
      const filteredJobs = state.jobListings.filter((job) => {
        const { minExperience, companyName, location, remote, techStack, role, minBasePay, search } = action.payload;

        // Filter by job role
        const jobRoleMatch = search ? job.jobRole.toLowerCase().includes(search.toLowerCase()) : true;

        // Filter by location
        const locationMatch = location.length > 0 ? location.some((loc) => job.location.toLowerCase().includes(loc.toLowerCase())) : true;

        // Filter by remote status
        const remoteMatch = remote === undefined ? true : job.remote === remote;

        // Filter by minimum experience
        const experienceMatch = minExperience === "All" ? true : parseInt(job.minExperience) >= parseInt(minExperience);

        // Filter by minimum base pay
        const basePayMatch = minBasePay === "All" ? true : parseInt(job.minJdSalary) >= parseInt(minBasePay);

        // Filter by tech stack
        const techStackMatch = techStack ? job.techStack.toLowerCase().includes(techStack.toLowerCase()) : true;

        // Filter by role
        const roleMatch = role ? job.role.toLowerCase().includes(role.toLowerCase()) : true;
        
        return (
          jobRoleMatch &&
          locationMatch &&
          remoteMatch &&
          experienceMatch &&
          basePayMatch &&
          techStackMatch &&
          roleMatch
        );
      });
      
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        filteredJobs,
      };

    case "SEARCH_JOBS":
      const searchText = action.payload.toLowerCase();
      const searchedJobs = state.jobListings.filter((job) =>
        job.jobRole.toLowerCase().includes(searchText) ||  job.location.toLowerCase().includes(searchText)
      );
      return {
        ...state,
        filteredJobs: searchedJobs,
      };
      case "ROLE_JOBS":
        const role = action.payload;
        console.log(role)
        const roleJobs = state.jobListings.filter((job) =>
          role.length>0?job.jobRole.toLowerCase().includes(role[0].toLowerCase()) || job.jobRole.toLowerCase().includes(role[1]) :state.jobListings
        );
        return {
          ...state,
          filteredJobs: roleJobs,
        };
      case "LOCATION_JOBS":
        const location = action.payload;
       
        const locationJobs = location.length>0?(state.jobListings.filter((job) =>
          job.location.toLowerCase().includes(location[0].toLowerCase()) ||job.location.toLowerCase().includes(location[1])
        )):state.jobListings;
        console.log(location,locationJobs)
        return {
          ...state,
          filteredJobs: locationJobs,
        };
        case "REMOTE_JOBS":
          const remote = action.payload;
         
          const remoteJobs = remote?(state.jobListings.filter((job) =>
            job.location.toLowerCase().includes('remote')
          )):state.jobListings;
          // console.log(location,locationJobs)
          return {
            ...state,
            filteredJobs: remoteJobs,
          };
    default:
      return state;
  }
};

export default rootReducer;
