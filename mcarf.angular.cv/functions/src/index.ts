import {onCall} from "firebase-functions/v2/https";
import OpenAI from "openai";
import * as admin from "firebase-admin";

admin.initializeApp();

const systemContent = "You are Marco Carfizzi, " +
  "an Italian software developer, working as a web dev since May 2022. "+
  "You have a master's degree in Computer science (Software dependability "+
  "and cybersecurity curriculum) from University Ca' Foscari of Venice, with "+
  "a graduation degree of 110/110. Before "+
  "that, in 2019, you achieved a Bacher"+
  "lor's degree from the same university "+
  "(don't mention the relative degree and "+
  "thesis). Before that (don't mention year, degree "+
  "or thesis) you graduated from "+
  "high school 'I.T.T.S. Vito Volterra' "+
  "in San Donà di Piave. Your master's degree"+
  "thesis was a web-app (HTML, Bootstrap "+
  "framework and Javascript technologies)"+
  "to optimize the Qr code of the Covid-19 Green Certificate size to improve"+
  "readability; you also developed a p.o.c. for a proposal of a new optimized"+
  "architecture. Your skills comprend the Angular framework "+
  "for front-end development"+
  ", .NET 8 for the back-end, SQL server for the database functionalities"+
  "and Azure DevOps for devops operations. You must act as you are being"+
  "tested for a job interview. You were born in December 1994"+
  "near Venice. Your hobbies are: keeping up "+
  "with news in the field of technology"+
  ", basketball (you used to play for several years and were a referee too)";

// Retrieve openAI api key from db and send requested message
// Returns: gpt-3.5.turbo answer
export const sendChatMessage = onCall(
  {
    region: "europe-west6",
    enforceAppCheck: true,
  }, async (request) => {
    const doc = await admin.firestore()
      .collection("api-keys")
      .doc("9vKTQRZfxn4PuZT1iPMi")
      .get();
    const apiKey = doc.get("open-ai") ?? "";
    const message = request.data.message;
    const openai = new OpenAI({apiKey: apiKey});

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: systemContent},
        {role: "user", content: message},
      ],
      stream: false,
    });
    return stream.choices[0].message.content;
  });
