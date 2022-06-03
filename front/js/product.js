/* METTRE COM*/
const productId = new URL(location.href).searchParams.get("id");

 /* Récupère les données de l'API, les convertis en .json et les stocke dans l'array data*/
 fetch('http://localhost:3000/api/products/'+productId)
 .then(res => res.json())  /* convertis les données en .json*/
 .then(data => {

    /* Attribue aux élements de la carte produit les données du produit choisi */
    let img = document.querySelector("section.item img")
    img.setAttribute("src", data.imageUrl)
    img.setAttribute("alt", data.altTxt)

    let title = document.querySelector("#title")
    title.textContent = data.name

    let description = document.querySelector("#description")
    description.textContent = data.description

    let price = document.querySelector("#price")
    price.textContent = data.price
    
    /* parcours chaque couleur de l'array Colors en créant l'élément correspondant pour la liste*/
    for (let j in data.colors) {

        let colors = document.querySelector("#colors")
        const color = document.createElement("option")
        color.setAttribute("value", data.colors[j])
        color.textContent = data.colors[j]
        colors.appendChild(color)
    }


     /* On écoute la liste déroulante avec l'Evenement Change et on enregistre aussitôt la valeur choisie par l'utilisateur
     dans la variable productColorValue préalablement déclarée*/
    let productColorElement = document.querySelector("#colors");
    let productColorValue ="";
    productColorElement.addEventListener('change', (event) => {
        productColorValue = event.target.value
        console.log(productColorValue)
    });
  

    /*Même principe mais pour la quantité selectionnée pour le produit*/
    let productQuantityElement = document.querySelector("#quantity");
    let productQuantityValue ="";
    productQuantityElement.addEventListener('change', (event) => {
        productQuantityValue = event.target.value
        console.log(productQuantityValue)
    });


    /* On écoute le bouton Ajouter au panier avec l'Evenement click*/
    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", () =>{
        
         /* On crée un objet contenant nos choix produit */
        let productChoice = {
            id: productId,
            color: productColorValue,
            quantity: productQuantityValue 
        };

        console.log(productChoice);

    
    
})




 })


