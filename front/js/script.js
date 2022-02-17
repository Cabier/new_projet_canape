//fonction qui s'execute dès le chargement de la page qui va contenir le code de base pour pas avoir de variable au niveau du scope global

async function main() {
    const articles = await getArticles()// await ça veut dire que tu attends que la promesse soit résolu
    
        displayArticle(articles)
    
}

function getArticles() {
    return fetch ("http://localhost:3000/api/products")
    //on attache les fonctions qu'il va exevuter quand il aura récupérer les données
    .then(function(httpBodyResponse){
        return httpBodyResponse.json()// on transforme
    
    })
    .then(function(articles) {
    return articles
//then c'est la fonction qu'il va executer quand on aura récupéré les données
    })
   // quand on fait un return dans un then on peut le récupérer dans un then suivant du coup au lieu de l'appeler httpBodyResponse.json()
//on l'appelle article
    .catch(function(error) {
    alert(error)
    })
}

function displayArticle(articles) {
    const items = document.getElementById("items")
    for(article of articles){
        items.innerHTML+=`<a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a>
        
        `
    }
   
}

main()