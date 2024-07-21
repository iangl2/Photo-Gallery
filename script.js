const APILINK= 'https://dog.ceo/api/breeds/image/random';
const APILINKbreeds= 'https://dog.ceo/api/breeds/list/all'

const grid= document.getElementById("grid")
const shuffleButton=document.getElementById('shuffle')
const searchInput = document.getElementById('search-input')
const dropdownMenu= document.getElementById('dropdown-search')

createCards();
returnPets(APILINK);

shuffleButton.addEventListener('click',shuffleCards)
dropdownMenu.addEventListener('focus',displayDropdown, true)
dropdownMenu.addEventListener('blur',displayDropdown, true)
// dropdownMenu.addEventListener('blur',displayDropdown, true)
// dropdownMenu.addEventListener('click',displayDropdown)

searchInput.addEventListener('keyup',filterFunction)

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
    loadingCards();
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
        // console.log(data.message)
        // console.log(breed());
        
        imageDescriptionCollection[i].innerHTML="Breed: "+ breed();
        imageContainerCollection[i].querySelector('img').src=await data.message; 
        imageContainerCollection[i].querySelector('img').style.display='block';
        imageContainerCollection[i].querySelector('.loadingIcon').style.display = 'none';
    }
}
function displayDropdown(e) {
        const myDropdown = document.getElementById('myDropdown')
        const input = document.getElementById('search-input')
        console.log(e.type+"  "+ e.target.nodeName);
       
        if(e.target.nodeName=='INPUT'&&e.type=='focus'){
         
            createOptions();
        }
        
        if (e.type=='blur'&& myDropdown.matches(':hover')==false && input.matches(':hover')==false) {
              myDropdown.classList.remove("show"); 
          
        
        }
         else{
        
            myDropdown.classList.add("show"); 
         }
    
    
  }

 async function filterFunction() {
   
    createOptions()
   
  }


  async function createOptions(){
   const filter = document.getElementById("search-input").value.toUpperCase();
    const dropdown = document.getElementById("myDropdown")
    dropdown.innerHTML=''
    const filteredPets = []
    try {
        const response = await fetch(APILINKbreeds);
        const data = await response.json();
        const message = data.message
        for (const key in message) {
            
            if (message[key].length) {
                for (let iterator of message[key]) {
                    filteredPets.push(iterator+ ' '+key)
                }
            } else {
                filteredPets.push(key)
            }
        }
        for (const iterator of filteredPets) {
            
            if (iterator.toUpperCase().indexOf(filter) > -1) {
                const anchor = document.createElement('a')
                anchor.innerHTML=iterator
                anchor.setAttribute('href', '#')
                
                anchor.addEventListener('click', (e) => {
                    
                    const val= e.target.innerHTML;
                    if (val.includes(" ")) {
                        returnPets('https://dog.ceo/api/breed/'+val.split(" ")[1]+'/'+val.split(" ")[0]+'/images/random'); 
                    } else {
                        returnPets('https://dog.ceo/api/breed/'+val+'/images/random')
                    }
                       
                    
                },true)
                dropdown.appendChild(anchor);
            } 
           
        }
        console.log()
       } catch (error) {
        console.log(error)
       }
  }

