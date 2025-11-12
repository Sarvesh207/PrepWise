import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export default {
  profileView: async () => {
    try {
      const response = await instance.get("/profile/view", {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      const response = await instance.patch("/profile/edit", data, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  // Education endpoints
  addEducation: async (data: any) => {
    try {
      const response = await instance.post("/user/add-education", data, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateEducation: async (id: string, data: any) => {
    try {
      const response = await instance.patch(`/update-education/${id}`, data, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getEducations: async () => {
    try {
      const response = await instance.get(`/user/educations`, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteEducation: async (id: string) => {
    try {
      const response = await instance.delete(`/delete-education/${id}`, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  // Experience endpoints
  getExperiences: async () => {
    try {
      const response = await instance.get(`/user/experiences`, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  addExperience: async (data: any) => {
    try {
      const response = await instance.post(`/user/add-experience`, data, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateExperience: async (id: string, data: any) => {
    try {
      const response = await instance.patch(`/user/update-experience/${id}`, data, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteExperience: async (id: string) => {
    try {
      const response = await instance.delete(`/user/delete-experience/${id}`, { withCredentials: true });
      return response;
    } catch (error) {
      throw error;
    }
  },
};
