const API_BASE_URL = 'YOUR_API_BASE_URL'; // Replace with your actual API URL

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
  return response.json();
}

export const imageApi = {
  uploadEventImage: async (file: FormData) => {
    const response = await fetch(`${API_BASE_URL}/events/images/upload`, {
      method: 'POST',
      body: file,
    });
    return handleResponse(response);
  },

  getEventImage: async (imageId: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/events/images/${imageId}`);
    const data = await handleResponse(response);
    return data.url;
  },

  deleteEventImage: async (imageId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/images/${imageId}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }
};
