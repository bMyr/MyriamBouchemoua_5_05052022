let itemsConteneur = document.getElementById("items"); 
const productNumber = 8; /* Trouver comment compter automatiquement nb produit dans API*/

/* boucle for avec 8 itérations*/
for (let i = 0; i <= productNumber; i++) {
   console.log("Produit numéro :"+ i);

   /* Récupère les données de l'API et crée chaque carte produit*/
   fetch('http://localhost:3000/api/products')
   .then(res => res.json())  /* convertis les données en .json*/
   .then(data => {
        const a = document.createElement("a")
        itemsConteneur.appendChild(a)
        a.setAttribute("href", "http://localhost:3000/api/products/"+data[i]._id)

        const article = document.createElement("article")
        a.appendChild(article)

        const img = document.createElement("img")
        article.appendChild(img)
        img.setAttribute("src", data[i].imageUrl)
        img.setAttribute("alt", data[i].altTxt)

        const h3 = document.createElement("h3")
        article.appendChild(h3)
        h3.classList.add("productName")
        h3.textContent = data[i].name

        const p = document.createElement("p")
        article.appendChild(p)
        p.classList.add("productDescription")
        p.textContent = data[i].description

   })
}