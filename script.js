const APILINK= 'https://dog.ceo/api/breeds/image/random';

const grid= document.getElementById("grid")

returnPets(APILINK);



function returnPets(url){

    for(let i=0;i<12;i++){
        fetch(url).then(res => res.json()).then(function(data){
            console.log(data.message);

            const photocard =document.createElement('div');
            photocard.setAttribute('class','photocard');
            const imageContainer = document.createElement('div')
            imageContainer.setAttribute('class','imageContainer');
            const image = document.createElement('img')
            const  imageDescriptionContainer = document.createElement('div')
            imageDescriptionContainer.setAttribute('class','imageDescriptionContainer')
            const imageDescription = document.createElement('h3')
            imageDescription.setAttribute('class', 'imageDescription')

            image.src= data.message;
            imageContainer.appendChild(image)
            imageDescriptionContainer.appendChild(imageDescription)
            photocard.appendChild(imageContainer)
            photocard.appendChild(imageDescriptionContainer)

            grid.appendChild(photocard);
        });
        

        
    }
        
    
    

}