// import OpenAI from "openai";


// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAPI_KEY,
//   dangerouslyAllowBrowser: true, // Only for development!
// });

// export const generateText = async (prompt : string) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: prompt }],
//     });
//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("Error calling OpenAI API:", error);
//     return "Sorry, I couldn't process that request.";
//   }
// };
