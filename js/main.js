
//const config={apiKey:`${weather.env.WEATHER_API_KEY}`}

const API_KEY="live_ayhEpftmA2C6Kqz0DNpGaP0eVvtEZukS45VVwa00j2cm2llVyervwEP7zhDzi7Rm"

document.getElementById("search").onclick=getBreed;

function validateInput()
{
    let obtenerEle = document.getElementById('breed').value.trim().toLowerCase();
    if(obtenerEle!=='')
    {
        return obtenerEle;
    }else{
        alert('Add a breed please');
    }
}

function getBreed(){
    let mainBreed=validateInput();
    fetch(`https://dog.ceo/api/breeds/list/all`)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            console.log(data.message)
            let breedResponse=data.message[mainBreed]
            console.log(data.message[mainBreed])
            //option 1 show the options that the main branch has
            if(!breedResponse){
                //option 2 message that the breed is not found 
                alert("The breed wasn't found")
            }else if(breedResponse.length===0){
                    //option 3 if found 1 send the response to the next API
                    console.log(`sendin g this${getFinalBreed(mainBreed)}`)    
                    return getFinalBreed(mainBreed)
                }else  if(breedResponse.length>=1)
                {
                    //option 3 if found 1 send the response to the next API
                    let subBreedList=breedResponse.join(',');
                    let subBreed=prompt(`Please write ONE of these sub Breeds:\n ${subBreedList}`); 
                    subBreed=subBreed.trim().toLowerCase();
                    subBreed=subBreed
                    
                    let finalBreed=`${subBreed} ${mainBreed}`
                    console.log(finalBreed)
                    return getFinalBreed(finalBreed)
                }
             
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}
function getFinalBreed(savedBreed)
{
    const targetUrl=`https://api.thedogapi.com/v1/breeds/search?q=${savedBreed}&limit=5`
    fetch(targetUrl, {
        headers:{
            "x-api-key":API_KEY
        }
    })
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
        let html='';
            
         if(data.length===0){
            alert('No results found')
         }else{
            data.forEach(dog => {
                console.log(`Respuesta de la API the dog api:${dog.name}`)
                 html+=`<section class="box">
                            <section class="title">
                                <span>BREED PROFILE</span>
                                <h3 id="final-breed">${dog.name.toUpperCase()} profile</h3>
                                <p>Review the breed details below, then continue to add visit details for this patient.</p>
                            </section>
                            <img src="${dog.image.url}" alt="dog image">
                            <section class="details">
                                <div><h5 class="title-description">Breed Group</h5><h5 class="description">${dog.breed_group}</h5></div>
                                <div><h5 class="title-description">Typical Weight</h5><h5 class="description">${dog.weight.imperial} lb</h5></div>
                                <div><h5 class="title-description">Typical Height</h5><h5 class="description">${dog.height.imperial} in</h5></div>
                                <div><h5 class="title-description">Life span</h5><h5 class="description">${dog.life_span} years</h5></div>
                                <div><h5 class="title-description">Life span</h5><h5 class="description">${dog.temperament}</h5></div>
                                <div><h5 class="title-description">Life span</h5><h5 class="description">${dog.description}</h5></div>
                                <button type="button" name="button" id="search">SAVE DOGGI</button>
                            </section>	
                            
                        </section>`
                        document.querySelector('.container-breed-details').innerHTML=html;
                console.log(`Breed: ${dog.name}, Temperament: ${dog.temperament}`);
            })
        }        
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}
//not necessary but it was good to have it
function capitalFirstLetter(word)
{
    if(!word) return ''; 
       console.log(word.charAt(0).toUpperCase()+word.slice(1));
}
//
function listBreeds(listOfBreed)
{
    //html message to show what the user has to do
    const message="Select one breed"
    document.getElementById('message-user').innerText=message
    listOfBreed.forEach(breed =>{
        const optionBreed=document.querySelector("#list-breeds").appendChild(document.createElement("option"))
        optionBreed.innerText=breed
    });
}








