export interface Device {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
}

export const devices: Device[] = [
  {
    id: "strava",
    name: "Strava",
    baseUrl: import.meta.env.STRAVA_INTEGRATION_BASE_URL,
    apiKey: import.meta.env.STRAVA_INTEGRATION_API_KEY,
  },
  // {
  //   id: "garmin",
  //   name: "Garmin",
  //   baseUrl: "https://garmin-integration.jainparichay.online",
  //   apiKey: "1234567890",
  // },
  {
    id: "whoop",
    name: "Whoop",
    baseUrl: "https://whoop-integration.jainparichay.online",
    apiKey: "1234567890",
  },
];

// Helper function to check device connection status
export const getConnectionStatus = async (
  device: Device,
  userId: string
): Promise<any> => {
  try {
    const response = await fetch(`${device.baseUrl}/${userId}`, {
      method: "POST",
      headers: {
        "x-api-key": device.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error checking ${device.name} connection:`, error);
    return "Error";
  }
};
