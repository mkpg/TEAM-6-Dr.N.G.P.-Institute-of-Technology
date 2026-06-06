const API_KEY = "AIzaSyBDWHjTHHASRRq8535FpIbp2VZ3AoFq2Vw";

export async function askGemini(prompt: string, systemInstruction?: string): Promise<string> {
  try {
    const contents = [
      {
        parts: [
          {
            text: systemInstruction ? `${systemInstruction}\n\nUser Question: ${prompt}` : prompt
          }
        ]
      }
    ];

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents })
    });
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Gemini API failure");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from Gemini.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message || "Unable to retrieve advice from Gemini API."}`;
  }
}
