import { NextResponse } from "next/server";
import { ClientOptions, OpenAI } from "openai";

// Create an OpenAI API client
const config: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(config);

export const runtime = "edge";

// This is the instructions that GPT-4 will use to know how to respond. For more information on
// the difference between a system message and a user message, see:
// https://platform.openai.com/docs/guides/gpt/chat-completions-api
const systemMessage = {
  role: "system",
  content:
    "You are a translator expert that considers the context of all the text given to you before translating, you receive the text in a array format and returns the translations in the same format without empty spaces",
} as const;

// This is used to format the message that the user sends to the API. Note we should
// never have the client create the prompt directly as this could mean that the client
// could use your api for any general purpose completion and leak the "secret sauce" of
// your prompt.

async function buildUserMessage(req: Request): Promise<any> {
  try {
    const body = await req.json();
    if (!body?.textsToTranslate || !body?.languageToTranslateTo) return;

    return {
      role: "user",
      content: `translate the array to ${body?.languageToTranslateTo}\n ${body?.textsToTranslate}`,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: Request) {
  // Ask OpenAI for a streaming completion given the prompt
  try {
    const userMessage = await buildUserMessage(req);

    const response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo-1106",
      model: "gpt-3.5-turbo",

      stream: false,
      temperature: 0,

      messages: [systemMessage, userMessage],
    });

    return new NextResponse(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
