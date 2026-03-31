import client from "./client";

export const getStudents = async (filters = {}) => {
    const response = await client.get("/students", { params: filters });
    return response.data;
};

export const getStudentById = async (Id) => {
    const response = await client.get(`/students/${Id}`);
    return response.data;
};

export const createStudent = async (data = {}) => {
    const response = await client.post("/students", data);
    return response.data;
};

export const updateStudent = async (id, data = {}) => {
    const response = await client.put(`/students/${id}`, data);
    return response.data;
};

export const deleteStudent = async (id) => {
    const response = await client.delete(`/students/${id}`);
    return response.data;
};

export const getStudentMarks = async (studentId) => {
    const response = await client.get(`/marks/student/${studentId}`);
    return response.data;
};

export const createMark = async (studentId, data) => {
    const response = await client.post(`/marks/student/${studentId}`, data);
    return response.data;
};

export const updateMark = async (id, data) => {
    const response = await client.put(`/marks/${id}`, data);
    return response.data;
};

export const deleteMark = async (id) => {
    const response = await client.delete(`/marks/${id}`);
    return response.data;
};
