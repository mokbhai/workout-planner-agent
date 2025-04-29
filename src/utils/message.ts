export const sendWhatsAppMessage = async (phoneNumber: string, message: string) => {
  const url = `${import.meta.env.EVO_SERVER_URL}/message/sendText/${
    import.meta.env.EVO_INSTANCE
  }`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: `${import.meta.env.EVO_API_KEY}`,
    },
    body: JSON.stringify({
      number: phoneNumber,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send WhatsApp message");
  }

  return await response.json();
};
