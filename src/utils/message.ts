export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
) => {
  const EVO_INSTANCE = import.meta.env.EVO_INSTANCE;
  const EVO_SERVER_URL = import.meta.env.EVO_SERVER_URL;
  const EVO_API_KEY = import.meta.env.EVO_API_KEY;

  const url = `${EVO_SERVER_URL}/message/sendText/${EVO_INSTANCE}`;

  const requestBody = {
    number: phoneNumber,
    text: message,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${EVO_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    // Log the error response
    const errorText = await response.text();
    console.error("WhatsApp API Error Response:", errorText);

    throw new Error("Failed to send WhatsApp message", {
      cause: response,
    });
  }

  return await response.json();
};
