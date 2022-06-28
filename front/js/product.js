// On récupère l'id produit dans l'url 
const productId = new URL(location.href).searchParams.get("id");

/* Récupère les données de l'API, les convertis en .json et les stocke dans l'array data*/
fetch('http://localhost:3000/api/products/'+productId)
.then(res => res.json())  /* convertis les données en .json*/
.then(data => {

    /* Attribue aux élements de la carte produit les données du produit choisi */

    let headTitle = document.querySelector("head > title")
    headTitle.textContent = data.name

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
    });
  
    
    /*Même principe mais pour la quantité selectionnée pour le produit*/
    let productQuantityElement = document.querySelector("#quantity"),
        productQuantityValue =""
    ;
    productQuantityElement.addEventListener('change', (event) => {
        productQuantityValue = event.target.value
    });


    /* On écoute le bouton Ajouter au panier avec l'Evenement click*/
    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", (e) =>{

        // Je vérifie que l'utilisateur a correctement selectionné les options du produit

        if (!parseInt(productQuantityValue) || parseInt(productQuantityValue) > 100 || productColorValue == "") {
            alert("Veuillez choisir une couleur et une quantité comprise en 1 et 100");
            e.preventDefault();
        } else {
            
            // On crée un objet pour stocker nos choix produit  
            let productChoice = {
                id: productId,
                color: productColorValue,
                quantity: parseInt(productQuantityValue)
            };


            // On vérifie si un produit existe déjà dans le local storage
            //JSON.parse convertit les objets au format JSON en objet Javascript 
            let productLocalStorage = JSON.parse(localStorage.getItem("product"));
            
            // si produit existant dans le localStorage : 
            if (productLocalStorage) {
            
                //Je vérifie si un produit similaire existe déjà :
                //Dans l'array productLocalStorage, je récupère l'index de l'objet
                // ayant le même id et la même couleur que le produit que je viens d'ajouter (productChoice)
                let searchIndex = productLocalStorage.findIndex((product) => product.color==(productChoice["color"]) && product.id==(productChoice["id"]) );
                //Si aucun produit similaire trouvé, la variable searchIndex sera = à -1

                // si produit similaire déjà existant dans le panier : 
                if (parseInt(searchIndex) >= 0)  { 
                    // J'aditionne la nouvelle quantité à l'ancienne
                    productLocalStorage[searchIndex].quantity = parseInt(productLocalStorage[searchIndex].quantity) + parseInt(productChoice["quantity"]);

                    /* Envoi de l'objet productLocalStorage dans le localStorage */
                    /* JSON.stringify convertit les objet Javascript en objets au format JSON */
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.log("Produit déjà EXISTANT dans le panier, quantité bien mise à jour ! ");
                    alert("Produit(s) bien ajouté(s) au panier !");


                } else { // pas de produit similaire dans le panier:

                    //J'ajoute mes nouveaux choix produit à l'array productLocalStorage 
                    productLocalStorage.push(productChoice);
                    /* Envoi de l'objet productLocalStorage dans le localStorage */
                    /* JSON.stringify convertit les objet Javascript en objets au format JSON */
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.log("Produit NON EXISTANT dans le panier, bien ajouté ! ");
                    alert("Produit(s) bien ajouté(s) au panier !");
                }
        

            // si AUCUN produit dans le localStorage : 
            // Je crée un array productLocalStorage et j'y ajoute mes choix produit 

            } else {
                productLocalStorage=[];
                productLocalStorage.push(productChoice);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                console.log("Premier produit ajouté au panier !");
                alert("Produit(s) bien ajouté(s) au panier !");
            }

        }

    })  

 })


