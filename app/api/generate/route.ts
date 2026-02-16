import OpenAI from "openai";

export async function POST(req: Request) {
  const { niche } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `
  Create a simple automated online business in the ${niche} niche.

  Return JSON:
  {
    brand_name,
    offer,
    monetization,
    first_steps
  }
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return Response.json(JSON.parse(completion.choices[0].message.content));
}