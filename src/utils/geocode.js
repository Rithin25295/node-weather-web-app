const request = require('postman-request')


const geoCode = (address, callback) => {
    
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)
    +'.json?access_token=pk.eyJ1Ijoicml0aGluMSIsImEiOiJjazk3ZWE4MTYxNW5zM2NwdTk4NWh0bXp5In0.vN0wVIFpvlZh9FbSWtJWLw'
    
    request({url: geoCodeUrl ,json:true},(error,response) => {
    if(error){
        callback(('Unable to connect to the Map box service'),undefined)
    }else if(response.body.features.length === 0){
        callback(('Unable to find the location. Please check the API again if you specified parameters correctly'),undefined)
    }else{

        const features = response.body.features[0]
        const {center,text} = features
        
        callback(undefined,{

            //ES6 - Object Destructuring
            latitude: center[1],
            longitude: center[0],
            location: text
            
            //ES5 code
            // latitude: response.body.features[0].center[1],
            // longitude: response.body.features[0].center[0],
            // location: response.body.features[0].text
        })
    }
})
}


module.exports = geoCode


// Using got

// got(url)
//     .then(response => {
//         console.log(response.body)
//     })
//     .catch(error => {
//         console.log(error.response.body);
//     })
