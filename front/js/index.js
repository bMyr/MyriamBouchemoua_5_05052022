let itemsConteneur = document.getElementById("items"); 

   /* Récupère les données de l'API, les convertis en .json et les stocke dans l'array data*/
   fetch('http://localhost:3000/api/products')
   .then(res => res.json())
   .then(data => {

      /* boucle for avec autant d'itérations que de produit dans la base de donnée -> MAJ dynamique */
      for (let i in data) {
   
        const a = document.createElement("a")
        itemsConteneur.appendChild(a)
        a.setAttribute("href", "file:///C:/Users/b_myr/Documents/MyriamBouchemoua_5_05052022/front/html/product.html?id="+data[i]._id)

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

      }
   })