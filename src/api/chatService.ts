import axios from 'axios';

const API_URL = 'https://chat-api-k4vi.onrender.com';

export const setUsername = async (username: string) => {
  try {
    const response = await axios.post(`${API_URL}/chat/username`, {username});
    return response.data;
  } catch (error) {
    console.error(
      'API Error (setUsername):',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/chat/rooms`);
    return response.data;
  } catch (error) {
    console.error(
      'API Error (getRooms):',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createRoom = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}/chat/rooms`, {name});
    return response.data;
  } catch (error) {
    console.error(
      'API Error (createRoom):',
      error.response?.data || error.message,
    );
    throw error;
  }
};
