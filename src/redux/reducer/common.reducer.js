const initialState = {
  students: [],
  total: 0,
  loading: false,
  classes: [],
  campus: []
};
const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return { ...state, students: action.data?.docs, total: action.data?.total, loading: false };
    case 'LIST_LOADING':
      return { ...state, loading: true };
    case 'UPDATE_CLASS':
      return { ...state, classes: action.data?.classes, campus: action.data?.campus };
    default:
      return state;
  }
};

export { CommonReducer };
