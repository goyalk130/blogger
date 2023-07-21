export default async function scrapedata(url){
    
    const data = await fetch(`https://scrapperapi4.onrender.com/?url=${url}/`,{
        headers:{
            "Content-Type": "application/json",
        },
        method:"POST",
        mode:"cors"
        
    })

    return(await data.json())
}