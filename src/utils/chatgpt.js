import { Configuration, OpenAIApi } from "openai";

export async function makecall(topic,paras) {
    // const configuration = new Configuration({
    //   apiKey: process.env.NEXT_PUBLIC_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);

    // const completion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "user", content: `your task is to find relevent information only related to this topic = "${topic}" from this text :- ${paras} and use that related data to provide a comprehensive and SEO optimized 1000-word article that covers [Topic] . Ensure the article is engaging, well-structured, and incorporates relevant keywords and phrases to improve its search engine visibility. Use subheadings, bullet points, and images where appropriate to enhance readability and user experience. Focus on providing valuable and accurate information to the readers while maintaining an engaging tone throughout the article.` },
    //   ],
    // });

    const res = await fetch("https://api.openai.com/v1/chat/completions",{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
      },
      method:"POST",
      body:JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `your task is to find relevent information only related to this topic = "${topic}" from this text :- ${paras} and use that related data to provide a comprehensive and SEO optimized 1000-word article that covers [Topic] . Ensure the article is engaging, well-structured, and incorporates relevant keywords and phrases to improve its search engine visibility. Use subheadings, bullet points, and images where appropriate to enhance readability and user experience. Focus on providing valuable and accurate information to the readers while maintaining an engaging tone throughout the article. remember to write title after "title:" and write blog content after "blog:" and don't follow format of "Heading" a line break "content", don't use any extra data like- "subheading 1 2 3","heding 1 2 3" and also don't add any extra notes or disclaimer in the end `  },
        ],
        temperature:0.7
      })
    })
    return (await res.json());
  }