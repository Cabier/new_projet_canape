async function main() {
  const articleId = getArticleId();

  const article = await getArticle(articleId); //await attend resultat d'une promesse
  console.log(article);
  hydrateArticle(article);
  
  let bouton = document.getElementById("addToCart");

  //recuperation du bouton

  bouton.addEventListener("click", (event) => {
    event.preventDefault();
    addToCart(article);
  });

  function addToCart(article) {
    /**
     * Récuperer la couleur et la qte que l'user a demander
     */
    let laQuantite = document.getElementById("quantite").value;
    let laCouleur = document.getElementById("colors").value;
    /**
     * récuperer le pannier obtenir cart
     */
    let cartString = localStorage.getItem("cart");
    let cart = [];
    if (cartString != null) {
      // convertir cartString en Object
      cart = JSON.parse(cartString);
    }

    /**
     * Si le produit existe avec cette couleur on augmente la qte de + laQuantite;
     * et on l'ajoute dans le pannier 
     * return fin de fonction  (sinon on va ajouter le produit au pannier dans l'étape d'apres)
     */
    let findArticle = cart.find(ap => (ap._id == article._id && ap.selectedColor == laCouleur));
    if ( findArticle ) {
      let articleposition = cart.indexOf(findArticle); // position dans l'array de l'article
      if (articleposition >= 0) {
        cart[articleposition].quantite = parseInt(cart[articleposition].quantite) + parseInt(laQuantite);
        cartString = JSON.stringify(cart);
        localStorage.setItem("cart", cartString);
        alert("votre produit à bien été ajouté");
        return;
      }
    }
    /**
     * Le produit est pas dans le pnnaier on l'ajoute 
     * Ajouter laQuantite et laCouleur 
     * Mettre actricle dans cart
     */
    console.log("cart", cart);
    article.quantite = parseInt(laQuantite);// trandorme en nombre
    article.selectedColor = laCouleur;
    console.log("article", article);
    cart.push(article);
    cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
    alert("votre produit à bien été ajouté");
    return;
  }
}

function getArticleId() {
  return new URL(document.location).searchParams.get("id");
}

function getArticle(articleId) {
  let url = "http://localhost:3000/api/products/" + articleId;

  console.log("URL API /> 1 produit ", url); // ERREUR DE STRING
  return fetch(url)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

function hydrateArticle(article) {
  const templateElt = document.getElementById("templateArticle2"); //creation template//
  console.log(templateElt);

  const cloneElt = document.importNode(templateElt.content, true);

  let optionColor = "";
  article.colors.forEach((el) => {
    optionColor = optionColor + `<option value="${el}">${el}</option>`;
  });
  

  cloneElt.getElementById("imgitem").src = article.imageUrl;
  cloneElt.getElementById("title").textContent = article.name;
  cloneElt.getElementById("price").textContent = article.price;
  cloneElt.getElementById("description").textContent = article.description;
  cloneElt.getElementById("colors").innerHTML = optionColor;

  document.getElementById("item").appendChild(cloneElt);
}

// ajouter produit dans le panier cart//
//récupération des données et envoi au panier

//prix
//description couleur nombre //
main();
