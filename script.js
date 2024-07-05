const APILINK= 'https://dog.ceo/api/breeds/image/random';
const grid= document.getElementById("grid")
const shuffleButton=document.getElementById('shuffle')

createCards();
returnPets(APILINK);

shuffleButton.addEventListener('click',shuffleCards)


function createCards(){
    for(let i=0;i<12;i++){
    const photocard =document.createElement('div');
    photocard.setAttribute('class','photocard');
    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('class','imageContainer');
    const image = document.createElement('img');
    const loadingIcon = document.createElement('span')
    loadingIcon.setAttribute('class','material-symbols-outlined loadingIcon');
    loadingIcon.innerHTML='progress_activity';
    const  imageDescriptionContainer = document.createElement('div');
    imageDescriptionContainer.setAttribute('class','imageDescriptionContainer');
    const imageDescription = document.createElement('h4');
    imageDescription.setAttribute('class', 'imageDescription');
    imageContainer.appendChild(image);
    imageContainer.appendChild(loadingIcon);
    imageDescriptionContainer.appendChild(imageDescription)
    photocard.appendChild(imageContainer)
    photocard.appendChild(imageDescriptionContainer)
    grid.appendChild(photocard);
    }
    loadingCards();
}
function loadingCards(){
    const imageDescriptionCollection=document.getElementsByClassName('imageDescription');
    const imageContainerCollection=document.getElementsByClassName('imageContainer');
    for(let i=0;i<12;i++){
        imageDescriptionCollection[i].innerHTML='Loading Pet...';
        imageContainerCollection[i].querySelector('img').style.display='none';
        imageContainerCollection[i].querySelector('.loadingIcon').style.display = 'block';
    }
   }
function shuffleCards(){
    loadingCards();
    returnPets(APILINK);
}   
async function returnPets(url){
    const imageDescriptionCollection=document.getElementsByClassName('imageDescription');
    const imageContainerCollection=document.getElementsByClassName('imageContainer');
    for(let i=0;i<12;i++){
        // fetch(url).then(res => res.json()).then(function(data){
            
        //     const breed= () => { const value =  data.message.split("/")[4];  return value.includes("-") ?   value.split("-").reverse().join(" ") : value };
        //     // console.log(data.message)
        //     // console.log(breed());
            
        //     imageDescriptionCollection[i].innerHTML="Breed: "+ breed();
        //     imageContainerCollection[i].querySelector('img').src=data.message; 
            
            
        // })
        // .finally(()=>{
        //     imageContainerCollection[i].querySelector('img').style.display='block';
        //     imageContainerCollection[i].querySelector('.loadingIcon').style.display = 'none';
        // });
        const response = await fetch(url);
        const data = await response.json();

        const breed= () => { const value =  data.message.split("/")[4];  return value.includes("-") ?   value.split("-").reverse().join(" ") : value };
        console.log(data.message)
        // console.log(breed());
        
        imageDescriptionCollection[i].innerHTML="Breed: "+ breed();
        imageContainerCollection[i].querySelector('img').src=await data.message; 
        imageContainerCollection[i].querySelector('img').style.display='block';
        imageContainerCollection[i].querySelector('.loadingIcon').style.display = 'none';
    }
}
