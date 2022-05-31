const productId = new URL(location.href).searchParams.get("id");
console.log(productId); /* A SUPP*/

 /* METTRE COM*/
 fetch('http://localhost:3000/api/products/'+productId)
 .then(res => res.json())  /* convertis les données en .json*/
 .then(data => {

    console.log(data.imageUrl)

    let img = document.querySelector("section.item img")
    img.setAttribute("src", data.imageUrl)
    img.setAttribute("alt", data.altTxt)

    let title = document.querySelector("#title")
    title.textContent = data.name

    let description = document.querySelector("#description")
    description.textContent = data.description

    let price = document.querySelector("#price")
    price.textContent = data.price





 })