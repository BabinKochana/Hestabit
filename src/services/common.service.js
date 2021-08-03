import { axiosInstance } from "./axios.service";


export const getStudentList = async (page) => {
    return await axiosInstance.post("user/filter-students", { page: page.toString(), limit: '10' });
}

export const getClassDetail = async (page) => {
    return await axiosInstance.get("userClass/class-details");
}

export const updateStudent = async (data) => {
    return await axiosInstance.put("user/update-student ", data);
}