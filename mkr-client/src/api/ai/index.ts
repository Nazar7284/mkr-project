import OpenAI from "openai";
const API_KEY = process.env.REACT_APP_AI_KEY;

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getResponseAi = async ({ goalTitle }: { goalTitle: string }) => {
  try {
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Сформулюй список із 3–5 завдань для досягнення мети: ${goalTitle}. Кожне завдання повинно бути коротким, конкретним і містити лише його назву. Виведи результат у вигляді рядка, розділивши завдання за допомогою #.`,
        },
      ],
      max_tokens: 100,
      model: "gpt-4o-mini",
    });
    return result.choices[0].message.content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return "Something went wrong: " + error.message;
    } else {
      return "Something went wrong. Unknown error.";
    }
  }
};
