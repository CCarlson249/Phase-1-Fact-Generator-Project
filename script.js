function el(id) {
    return document.getElementById(id);
}
const factDiv = el('factbtn');
const removerConst = document.getElementsByClassName("factElement");
el('new-fact-button').addEventListener('click', generateRandomFact);
 
document.addEventListener('DOMContentLoaded', generateFirstFact)
 
function generateFirstFact(){
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => response.json())
    .then(fact => {
        localServerCheck(fact)
        factDisplay(fact);
    })
 } 
 
function generateRandomFact(){
    killAll();

    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => response.json())
    .then(fact => {
        localServerCheck(fact)
        factDisplay(fact);
    })
} 
 
function killAll(){
    //the purge😈👺
    document.getElementById("newFact").remove();

}
 
function factDisplay(fact) {
    const newFactDiv = document.createElement('div');
    newFactDiv.id = "newFact"
    newFactDiv.className = "factElement"

    const factP =  document.createElement('p');
    factP.className = "factElement"
    factP.id = "fact-element"
    factP.textContent = fact.text;
    newFactDiv.appendChild(factP);
   
    const like = document.createElement('p');
    let currentLikes = fact.likes;
    like.className = "factElement";
    like.classList.add('rating-button');
    like.textContent = "👍"+ fact.likes;
    like.addEventListener('click', () =>{
    ++currentLikes;

     fetch(`http://localhost:3000/facts/${factDiv.currentFactId}`,
     {method: 'PATCH',
     headers: {
        "Content-Type": "application/json",
                Accept: "application/json"
     },
     body: JSON.stringify({likes: fact[factDiv.currentFactId].likes})

     })});
    newFactDiv.appendChild(like);
   
    let currentDislikes = fact.dislikes;
    const disLike = document.createElement('p');
    disLike.className = "factElement";
    disLike.classList.add('rating-button');
    disLike.textContent = "👎" + fact.dislikes;
    disLike.addEventListener('click', () => {
    ++currentDislikes;

    fetch(`http://localhost:3000/facts/${factDiv.currentFactId}`, {
    method: 'PATCH',
    headers: {
       "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({dislikes: fact[factDiv.currentFactId].dislikes})
    })
});


    newFactDiv.appendChild(disLike);

    factDiv.append(newFactDiv);
}

function localServerCheck(fact){
    let factFound = false;
    let currentFact = fact.text;

    fetch("http://localhost:3000/facts")
    .then(response => response.json())
    .then((data) => {
        for(item in data){
            if(data[item].text === currentFact){
                factFound = true;
                factDiv.currentFactId = data[item].id
            }
        }
        if(factFound === false){
            
            fetch("http://localhost:3000/facts", {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    "text": currentFact,
                    "likes": 0,
                    "dislikes": 0,
                    "comments": []
                })
            })
            .then(response => response.json())
            .then((data) => {
                factDiv.currentFactId = data.id
            })
        }
    })
}

// let duplicateTestObj = {text: "test"}
// let primedTestObj = {text: "spumingus"}

// localServerCheck(duplicateTestObj)
// localServerCheck(primedTestObj)