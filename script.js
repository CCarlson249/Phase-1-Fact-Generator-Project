function el(id) {
    return document.getElementById(id);
}
const factDiv = el('factbtn');
const removerConst = document.getElementsByClassName("factElement");
el('new-fact-button').addEventListener('click', generateRandomFact);
 
document.addEventListener('DOMContentLoaded', generateFirstFact)

document.addEventListener('DOMContentLoaded', renderDatabaseComments)
 
function generateFirstFact(){
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => response.json())
    .then(fact => {
        factDisplay(fact);
    })
 } 
 
function generateRandomFact(){
    killAll();

    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(response => response.json())
    .then(fact => {
        
        factDisplay(fact);
    })
} 
 
function killAll(){
    //the purgeððº
    document.getElementById("newFact").remove();

}
 
function factDisplay(fact) {
console.log(fact);
    const newFactDiv = document.createElement('div');
    newFactDiv.id = "newFact"
    newFactDiv.className = "factElement"

    const factP =  document.createElement('p');
    factP.className = "factElement"
    factP.id = "fact-element"
    factP.textContent = fact.text;
    newFactDiv.appendChild(factP);
   
    const like = document.createElement('p');
    let currentLikes = 0;
    console.log(currentLikes);
    like.className = "factElement";
    like.classList.add('rating-button');
    like.textContent = "ð"+ currentLikes;
    like.addEventListener('click', () =>{
    ++currentLikes;
    like.textContent = "ð"+ currentLikes;
});


    

    newFactDiv.appendChild(like);
   
    let currentDislikes = 0;
    const disLike = document.createElement('p');
    disLike.className = "factElement";
    disLike.classList.add('rating-button');
    disLike.textContent = "ð" + currentDislikes;
    disLike.addEventListener('click', () => {
    ++currentDislikes;
    disLike.textContent = "ð" + currentDislikes;
    
    });



    newFactDiv.appendChild(disLike);

    factDiv.append(newFactDiv);
}

const commentForm = document.getElementById("new-comment")

commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newComment = e.target.comment.value;
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers:
            {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "text": newComment
            })
    })
    .then(response => response.json())
    .then(comment => renderComment(comment))
    
})


function renderComment (comment) {
    const addedComment = document.createElement('p');
    addedComment.setAttribute('id', 'indComment');
    addedComment.textContent = comment.text;
    const commentTag = document.querySelector('#comment-area');
    commentTag.appendChild(addedComment);
    commentForm.value = ""
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.style.display = "none";
    deleteBtn.addEventListener('click', function(){
            addedComment.remove();
        })
    addedComment.appendChild(deleteBtn);
    addedComment.addEventListener('mouseover', function(){
        // addedComment.style.display ="none";
        deleteBtn.style.display = "block";
    })
    addedComment.addEventListener('mouseout', function(){
        // addedComment.style.display = "block";
        deleteBtn.style.display ="none";
    })
}

function renderDatabaseComments(){
    fetch("http://localhost:3000/comments")
    .then(response => response.json())
    .then((comments) => {
        comments.forEach(comment => renderComment(comment))
    })
}