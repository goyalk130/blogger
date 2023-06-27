import axios from "axios";
import googleTrends from "google-trends-api";
import Parser from "rss-parser";
import xml2js from "xml2js"


const parser = new Parser({
  headers: { 'User-Agent': 'Chrome' }
});

export async function getDailyTrendsForDay() {

  // await fetch('https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-330&geo=US&cat=all&ed=20230627&ns=15',{

  const res = await axios.get("https://trends.google.com/trends/trendingsearches/daily/rss?geo=US")

  const parser = new xml2js.Parser();
  const parsedXml = await parser.parseStringPromise(res.data);
  console.log( parsedXml.rss)
  return parsedXml
  // console.log(res.data)


  // await fetch('https://trends.google.com/trends/trendingsearches/daily/rss?geo=US',{
  //   mode:"cors",
  //   method:'GET',
  //   headers: {
  //     'Access-Control-Allow-Origin':'*'
  //   }}).then(response => response.json()).then(data => {
  //      // Code to handle the JSON data
  //   console.log(data); // Print the JSON data to the console
  //   // You can access the JSON properties and values here
  // }).catch(error => {
  //   // Handle any errors that occur during the fetch
  //   console.error('Error:', error);
  // });


  // const res = await fetch("https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-330&geo=US&cat=all&ed=20230627&ns=15",{
  //   method:'GET',
  //   mode: 'no-cors',
  //   headers: {
  //     'Access-Control-Allow-Origin':'*'
  //   }
  // })

  // console.log(res)


  // googleTrends.dailyTrends({
  //     trendDate: new Date(),
  //     geo: "US",
      
  //   },function (err,results) {

  //     if(err){
  //       console.error("Oh no an error!", err);
  //     }else{
  //       var resultsJSON = JSON.parse(results);

  //     var data = resultsJSON["default"];
  //     var dayData = data["trendingSearchesDays"][0];
  //     var searches = dayData["trendingSearches"];

  //     console.log(`On the date of ${day}\n`);
  //     searches.forEach(function (search) {
  //       console.log(
  //         `The search term ${search["title"]["query"]} has ${search["formattedTraffic"]} amount of traffic`
  //       );
  //     });
  //     }
      
  //   })
}
