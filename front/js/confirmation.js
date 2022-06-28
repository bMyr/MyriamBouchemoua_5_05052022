// J'affiche le numéro de commande sans le stocker 

let orderIdElement = document.querySelector("#orderId")
orderIdElement.textContent = new URL(location.href).searchParams.get("orderId");