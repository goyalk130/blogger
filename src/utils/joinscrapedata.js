export default function joinScrapeData(arr){
    let sum="";    
    for(let i in arr){
        sum+=arr[i]+" ";
    }
    return sum;
}
