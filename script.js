const APILINK= 'https://dog.ceo/api/breeds/image/random';

const grid= document.getElementById("grid")

returnPets(APILINK);



function returnPets(url){

    for(let i=0;i<12;i++){
        fetch(url).then(res => res.json()).then(function(data){
            
            const breed= () => { const value =  data.message.split("/")[4]; return value.includes("-") ?  value.split("-")[1] + " " +value.split("-")[0] : value };
            console.log(data.message)
            console.log(breed());
            const photocard =document.createElement('div');
            photocard.setAttribute('class','photocard');
            const imageContainer = document.createElement('div')
            imageContainer.setAttribute('class','imageContainer');
            const image = document.createElement('img')
            const  imageDescriptionContainer = document.createElement('div')
            imageDescriptionContainer.setAttribute('class','imageDescriptionContainer')
            const imageDescription = document.createElement('h4')
            imageDescription.setAttribute('class', 'imageDescription')

            imageDescription.innerHTML="Breed: "+ breed();
            image.src= data.message;
            imageContainer.appendChild(image)
            imageDescriptionContainer.appendChild(imageDescription)
            photocard.appendChild(imageContainer)
            photocard.appendChild(imageDescriptionContainer)

            grid.appendChild(photocard);
        });
        

        
    }
        
    
    

}