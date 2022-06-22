//AFFICHAGE PRODUIT PANIER................................................................................

// On récupère les produits dans le local storage
//JSON.parse convertit les objets au format JSON en objet Javascript 
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

// déclaration variable pour la quantité totale
let totalQuantityValue = 0;
// déclaration variable pour la quantité totale
let totalPriceValue = 0;


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



// QUANTITE ET PRIX TOTAL ................................................................................
 
let totalQuantity = document.getElementById("totalQuantity");
totalQuantityValue += productQuantity;
totalQuantity.innerHTML = totalQuantityValue;

let totalPrice = document.getElementById("totalPrice");
totalPriceValue += (data.price*productQuantity);
totalPrice.innerHTML = totalPriceValue;


// MODIFIER OU SUPPRIMER PRODUIT PANIER......................................................................


// Déclaration fonctions pour mise à jour DOM prix et quantité total
// en cas de modification quantité ou suppression de produit 

function totalQuantityUpdate() {
    // je récupère chaque quantité du DOM dans l'array ListOfQuantityValues
    let listOfQuantityElement = document.getElementsByClassName("itemQuantity");
    let listOfQuantityValues = [];
    for (y in listOfQuantityElement) {
        listOfQuantityValues.push(listOfQuantityElement[y].value);
    }

    // Je retire les "undefined"
    listOfQuantityValues = listOfQuantityValues.filter((el) => {
        return el != undefined;
    });

    // je convertis en nombre les elements du tableau
    listOfQuantityValues = listOfQuantityValues.map((x) => parseFloat(x));

    // j'additionne les quantités de l'array pour avoir la quantité totale
    let sumOfQuantity = 0;
    for (i in listOfQuantityValues) {
        sumOfQuantity += listOfQuantityValues[i];
    }
    totalQuantity.innerHTML = sumOfQuantity;
}

function totalPriceUpdate() {
    // je récupère dans le DOM chaque element p contenant le prix (dernière élement de la div parent)
    let listOfPriceElement = Array.from(document.querySelectorAll(".cart__item__content__description > p:last-child"));
    let listOfPriceValues = [];

    // je récupère chaque prix, je retire le dernier caractère € et j'ajoute le prix à l'array listOfPriceValues
    for (p in listOfPriceElement ) {
        let currentPriceElement = listOfPriceElement[p].textContent; 
        currentPriceElement = currentPriceElement.slice(0, currentPriceElement.length - 1);
        listOfPriceValues.push(currentPriceElement);
    }

    // je convertis en nombre les elements du tableau
    listOfPriceValues = listOfPriceValues.map((x) => parseFloat(x));

    // j'additionne les prix de l'array listOfPriceValues pour avoir le prix total
    let sumOfPrices = 0;
    for (i in listOfPriceValues ) {
        sumOfPrices += listOfPriceValues[i];
    }
    totalPrice.innerHTML = sumOfPrices;
}


// MODIFIER QUANTITE..............................................................................


// On écoute la quantité modifée avec l'Evenement Change et on enregistre aussitôt 
//la nouvelle valeur choisie par l'utilisateur dans la variable productQuantity

     input.addEventListener('change', (event) => {
        NewProductQuantity = event.target.value

        // mise à jour de la nouvelle quantité dans l'objet Product
        product.quantity = parseInt(NewProductQuantity)

        // Je remplace l'ancien object Product dans l'array productLocalStorage par le nouveau
        var productIndex = productLocalStorage.indexOf(product)
        productLocalStorage.splice(productIndex, 1, product)

        // Remplacement dans le local storage 
        localStorage.setItem("product", JSON.stringify(productLocalStorage));

        pPrice.textContent = ((data.price*NewProductQuantity)+" €")
        
        // OPTION 1 : window.location.reload(); --> Raffraichit la page pour mettre le prix et le total à jour 

        totalQuantityUpdate();
        totalPriceUpdate();

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

            totalQuantityUpdate();
            totalPriceUpdate();
        
         }) 
        

// FETCH end 
 }) 

// FOR end
} 


// ENVOYER FORMULAIRE COMMANDE...............................................................................



/* On écoute le bouton Commander au panier avec l'Evenement click*/
const orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", (e) =>{ 

// RECUPERER ET VERIFIER LES INFOS..........................................................................

    let firstNameInput = document.getElementById("firstName").value;
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let lastNameInput = document.getElementById("lastName").value;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    let addressInput = document.getElementById("address").value;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    let cityInput = document.getElementById("city").value;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    let emailInput = document.getElementById("email").value;
    let emailErrorMsg = document.getElementById("emailErrorMsg");


    // Déclaration des expressions régulières (regex)
    // Pour le prénom, le nom et la ville, on utilise la même
   
    let textRegex = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
    let addressRegex= new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    //let emailRegex = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$");
    // Pas besoin, l'input de type EMAIL vérifie déjà le format du texte inséré 
    

    
  //On vérifie chaque donnée avec une regex
  //En cas d'erreur on affiche un msg et on empêche l'envoi du formulaire avec  e.preventDefault();
  //Pas besoin de verifier si champs vide, car présence d'un "required" pour chaque input dans le formulaire
  
    if (!textRegex.test(firstNameInput)) {
        firstNameErrorMsg.innerHTML = "Veuillez renseigner le champ Prénom correctement.";
        e.preventDefault();

    } else if (!textRegex.test(lastNameInput)) {
        lastNameErrorMsg.innerHTML = "Veuillez renseigner le champ Nom correctement.";
        e.preventDefault();

    } else if (!addressRegex.test(addressInput)) {
        addressErrorMsg.innerHTML = "Veuillez renseigner le champ Adresse correctement.";
        e.preventDefault();

    } else if (!textRegex.test(cityInput)) {
        cityErrorMsg.innerHTML = "Veuillez renseigner le champ Ville correctement.";
        e.preventDefault();

    } else {

        // Si le formulaire est valide, on créé l'array product-ID qui contiendra les ID en string des produits achetés
        // Ainsi que l'objet Order qui contiendra cet array ainsi + l'objet Contact qui contient les infos de l'acheteur
        
        let productsID = productLocalStorage.map(a => a.id);
        console.log(productsID);


        const order = {
            contact: {
            firstName: firstNameInput,
            lastName: lastNameInput,
            address: addressInput,
            city: cityInput,
            email: emailInput,
            },
            products: productsID, 
        };

        console.log(order);

        e.preventDefault();


    //localStorage.setItem("contact", JSON.stringify(contact));




        
    }


    

      






}) 


