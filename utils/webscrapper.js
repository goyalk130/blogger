const axios = require('axios');
const cheerio = require('cheerio');

export async function scrapeWebsite(url) {
    try {
      // Fetch the HTML content of the website
      const response = await axios.get(url);
      const html = response.data;
  
      // Load the HTML content into Cheerio
      const $ = cheerio.load(html);
  
      // Use Cheerio selectors to extract the desired data
      const title = $('title').text();
      const paragraphs = $('p').map((index, element) => $(element).text()).get();
  
      // Print the scraped data
      console.log('Title:', title);
      console.log('Paragraphs:', paragraphs);
    } catch (error) {
      console.error('Error:', error);
    }
  }
