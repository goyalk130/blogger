import googleTrends from "google-trends-api";

// Command Line Functionality

// if (process.argv.length < 4) {
//   console.error("Error: Not enough arguments");
//   return;
// }

// var option = process.argv[2];

// if (option == "trending") {
//   day = process.argv[3].toString().trim();
//   console.log(day);
//   date = new Date(day);
//   console.log(date);
//   getDailyTrendsForDay(date);
// } else if (option == "interest") {
//   var searchTerm = process.argv[3];
//   getInterestOverTimeForKeyword(searchTerm);
// }

// Find the interest for a specific keyword

function getInterestOverTimeForKeyword(keyword) {
  googleTrends
    .interestOverTime({ keyword: "Women's march" })
    .then(function (results) {
      var resultsJSON = JSON.parse(results);

      var data = resultsJSON["default"];
      var timelineData = data["timelineData"]; // array of interest timestamps

      timelineData.forEach(function (timestamp) {
        console.log(
          `On the date ${timestamp["formattedTime"]}, the interest value was at ${timestamp.value}`
        );
      });
    })
    .catch(function (err) {
      console.error("Oh no there was an error", err);
    });
}

// Get a list of daily trending topics for a specific day

export async function getDailyTrendsForDay() {

  // await fetch('https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=-330&geo=US&cat=all&ed=20230627&ns=15',{
  await fetch('https://trends.google.com/trends/trendingsearches/daily?geo=US&ed=20230627',{
    method:'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }}).then(response => response.json()).then(data => {
       // Code to handle the JSON data
    console.log(data); // Print the JSON data to the console
    // You can access the JSON properties and values here
  }).catch(error => {
    // Handle any errors that occur during the fetch
    console.error('Error:', error);
  });


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
