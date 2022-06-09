//AFFICHAGE PRODUIT PANIER................................................................................

// On récupère les produits dans le local storage
//JSON.parse convertit les objets au format JSON en objet Javascript 
let productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);


// récupère chaque produit du local storage et les données associées (id, color et quantity)
for (i in productLocalStorage) {
    let product = (productLocalStorage[i]);
    let productId = product["id"];
    let productColor = product["color"];
    let productQuantity =  product["quantity"];


    // Récupère les données de l'API grâce à la variable proDuctId, 
    //les convertis en .json et les stocke dans l'array data
    fetch('http://localhost:3000/api/products/'+productId)
    .then(res => res.json())  // convertis les données en .json
    .then(data => {

        let cartItemsConteneur = document.getElementById("cart__items")

        const article = document.createElement("article")
        article.classList.add("cart__item")
        article.setAttribute("data-id", productId)
        article.setAttribute("data-color", productColor)
        cartItemsConteneur.appendChild(article)

        const divImg = document.createElement("div")
        divImg.classList.add("cart__item__img")
        article.appendChild(divImg)

        const img = document.createElement("img")
        img.setAttribute("src", data.imageUrl)
        img.setAttribute("alt", data.altTxt)
        divImg.appendChild(img)

        const divContent = document.createElement("div")
        divContent.classList.add("cart__item__content")
        article.appendChild(divContent)

        const divDescription = document.createElement("div")
        divDescription.classList.add("cart__item__content__description")
        divContent.appendChild(divDescription)

        const h2Name = document.createElement("h2")
        h2Name.textContent = data.name
        divDescription.appendChild(h2Name)

        const pColor = document.createElement("p")
        pColor.textContent = productColor
        divDescription.appendChild(pColor)

        const pPrice = document.createElement("p")
        pPrice.textContent = ((data.price*productQuantity) +" €") // PRIX DOIT SE METTRE A JR QUAND CHANGEMENT QNT
        divDescription.appendChild(pPrice)

        const divSettings = document.createElement("div")
        divSettings.classList.add("cart__item__content__settings")
        divContent.appendChild(divSettings)

        const divQuantity = document.createElement("div")
        divQuantity.classList.add("cart__item__content__settings__quantity")
        divSettings.appendChild(divQuantity)

        const pQuantiy = document.createElement("p")
        pQuantiy.textContent = "Qté :"
        divQuantity.appendChild(pQuantiy)

        const input = document.createElement("input")
        input.setAttribute("type", "number")
        input.classList.add("itemQuantity")
        input.setAttribute("name", "itemQuantity")
        input.setAttribute("min", "1")
        input.setAttribute("max", "100")
        input.setAttribute("value", productQuantity)        
        divQuantity.appendChild(input)

        const divDelete = document.createElement("div")
        divDelete.classList.add("cart__item__content__settings__delete")
        divSettings.appendChild(divDelete)

        const pDelete = document.createElement("p")
        pDelete.classList.add("deleteItem")
        pDelete.textContent = "Supprimer"
        divDelete.appendChild(pDelete)


// MODIFIER QUANTITE..............................................................................


// On écoute la quantité modifée avec l'Evenement Change et on enregistre aussitôt 
//la nouvelle valeur choisie par l'utilisateur dans la variable productQuantity

     input.addEventListener('change', (event) => {
        productQuantity = event.target.value

        // mise à jour de la nouvelle quantité dans l'objet Product
        product.quantity = productQuantity

        // Je remplace l'ancien object Product dans l'array productLocalStorage par le nouveau
        var productIndex = productLocalStorage.indexOf(product)
        productLocalStorage.splice(productIndex, 1, product)

        // Remplacement dans le local storage 
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
     });


// SUPPRIMER PRODUIT................................................................................

        // On écoute le bouton Supprimer au panier avec l'Evenement click
         pDelete.addEventListener("click", () =>{
        
            // je récupère l'index du produit dans l'array productLocalStorage et je le retire
             var productIndex = productLocalStorage.indexOf(product)
             productLocalStorage.splice(productIndex, 1)

            // surpprime le produit du DOM en récupérant l'ancètre Article le plus proche du btn supprimer
            const currentArticle = pDelete.closest('.cart__item');
            currentArticle.remove()

             // Remplacement de l'ancien array dans le Local storage par le nouveau
             // JSON.stringify convertit les objet Javascript en objets au format JSON
             
             localStorage.setItem("product", JSON.stringify(productLocalStorage));


            
           
         }) 
        


// FETCH end 
 }) 

 
// FOR end
} 



