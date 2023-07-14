export async function makecall({topic,paras}) {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `your task is to find relevent information only related to this topic = "${topic}" from this text :- ${paras} and use that related data to provide a comprehensive and SEO optimized 1000-word article that covers [Topic] . Ensure the article is engaging, well-structured, and incorporates relevant keywords and phrases to improve its search engine visibility. Use subheadings, bullet points, and images where appropriate to enhance readability and user experience. Focus on providing valuable and accurate information to the readers while maintaining an engaging tone throughout the article.` },
      ],
    });
    console.log(completion);
  }