//----------------GESTION DU BOUTON SUPPRIMER L'ARTICLE-------------------//
  // sélection des références de tous les boutons btn-supprimer
  let btnSupprimer = Array.from(document.querySelectorAll(".cart__item"));
  console.log(btnSupprimer);
  let tab = []
for (let l = 0; l < btnSupprimer.length; l++){
    btnSupprimer[l].addEventListener("click",() =>{

      btnSupprimer[l].parentElement.style.display="none";
      tab= mesProduitsEnregistrer;
      tab.splice([i],1);
        // pour éviter que quand on clique sur le bouton ça recharge la page
      mesProduitsEnregistrer=localStorage.setItem('cart',JSON.stringify(tab));
        //séléction de l'id du produit qui va être supprimé en cliquant sur le produit
        
        window.location.href="cart.html";
        localStorage.setItem("cart", JSON.stringify(actualCartString))

       alert("ce produit a été supprimer du panier");
       if (mesProduitsEnregistrer == null || mesProduitsEnregistrer == 0) {
        
        localStorage.setItem("cart", JSON.stringify(actualCartString))

        alert("ce produit a été supprimer du panier");
        window.location.href = "cart.html";
       }
    });
        //avec la méthode filter je sélectionne les éléments à garder et je supprime l'émément où le btn supp a été supprimé
  }    
       // la méthode filter va chercher tous les éléments qui ont été enregistré dans le local storage

       

       //on envoie la variable dans le local storage
       //la transformation