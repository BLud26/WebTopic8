let apodTitle = document.querySelector('#apod-title')
let apodExplanation = document.querySelector('#apod-explanation')
let apodImage = document.querySelector('#apod-image')
let apodVideo = document.querySelector('#apod-video')

let apodApiUrl = 'https://api.nasa.gov/planetary/apod?api_key=BTJAC3eNAAh800myyUq7p5Lzp7NX8xoM3tYiLxKh'

// Fetch can get many kinds of web resources, not just JSON
// Have to convert response into JSON, however, this could be slow
fetch(apodApiUrl) // Returns a Promise
    .then( response => { // response is the raw response data, not JSON yet
        if (!response.ok) { // NASA returned an error status
            throw new Error('NASA API returned status ' + response.status)
        }
        return response.json() // Extracts JSON from the response
    })
    .then( data => {
        console.log(data)
        // ...the rest stays exactly as you have it

        let title = data.title
        apodTitle.innerHTML = title

        let explanation = data.explanation
        apodExplanation.innerHTML = explanation

        let mediaType = data.media_type
        let url = data.url

        if (mediaType === 'image') {
            apodImage.src = url
            apodImage.style.display = 'block'
        }
        else if (mediaType === 'video') {
            apodVideo.src = url
            apodVideo.style.display = 'block'
        }
        else {
            alert('Unknown media type')
        }
    })
    .catch( error => { // Called if there is an error
        console.log(error)
        apodExplanation.innerHTML = 'Sorry, this could not fetch the astronomy picture.'
})