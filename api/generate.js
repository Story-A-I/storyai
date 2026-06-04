export default async function handler(req, res) {
  try {

    const prompt = req.body?.prompt;

    if (!prompt) {
      return res.status(400).json({
        error: "promptが空です"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data
      });
    }

    return res.status(200).json({
      result: data.choices?.[0]?.message?.content || "結果がありません"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}