import {
  getStudentList,
  getClassDetail
} from '../../../services/common.service';

const fetchStudentList = (page) => {
  return async (dispatch) => {
    dispatch({
      type: 'LIST_LOADING',
    });
    const access = await getStudentList(page);
    dispatch({
      type: 'UPDATE_LIST',
      data: access.data ? access.data?.data : '',
    });
  };
};

const fetchClassDetail = () => {
  return async (dispatch) => {
    const access = await getClassDetail();
    dispatch({
      type: 'UPDATE_CLASS',
      data: access.data ? access.data?.data : '',
    });
  }; 
};


export {
  fetchStudentList,
  fetchClassDetail
};
