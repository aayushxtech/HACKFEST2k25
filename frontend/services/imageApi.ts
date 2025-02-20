import axios from 'axios';

const API_BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your actual API URL

interface ImageUploadResponse {
  url: string;
  id: string;
}

export const imageApi = {
  uploadEventImage: async (file: FormData): Promise<ImageUploadResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events/images/upload`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  getEventImage: async (imageId: string): Promise<string> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/images/${imageId}`);
      return response.data.url;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  },

  deleteEventImage: async (imageId: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/events/images/${imageId}`);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};
