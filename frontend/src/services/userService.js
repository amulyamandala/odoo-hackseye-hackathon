import api from './api';

const userService = {
  getUsers: async () => {
    const response = await api.get('/employees');
    return response?.data || response || [];
  },

  getUserById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response?.data || response;
  },

  createUser: async (userData) => {
    const response = await api.post('/employees', userData);
    return response?.data || response;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/employees/${id}`, userData);
    return response?.data || response;
  },

  deleteUser: async (id) => {
    return await api.delete(`/employees/${id}`);
  },

  getDepartments: async () => {
    const response = await api.get('/departments');
    return response?.data || response || [];
  },

  getRoles: async () => {
    const response = await api.get('/roles');
    return response?.data || response || [];
  }
};

export default userService;
