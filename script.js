// script.js

document.addEventListener("DOMContentLoaded", function () {
    const bidButtons = document.querySelectorAll(".bid-button");
    const currentLotDisplay = document.getElementById("current-lot");
    const currentBidDisplay = document.getElementById("current-bid");
    const bidInstruction = document.getElementById("bid-instruction");
    const lotInput = document.getElementById("lot-input");
    const updateLotBtn = document.getElementById("update-lot-btn");

    // Valor inicial del lote y de la oferta
    let currentLot = 200;
    let currentBid = 200;

    // Función para actualizar la oferta actual y los valores de los botones
    function updateBidValues() {
        currentLot = parseInt(lotInput.value, 10); // Actualizar el valor del lote desde el input
        currentLotDisplay.textContent = `VALOR DEL LOTE: $${currentLot}`;

        // Actualizar oferta actual solo si es menor o igual al valor del lote
        if (currentBid <= currentLot) {
            currentBidDisplay.style.color = "red";
            currentBid = currentLot; // Igualar la oferta actual al valor del lote si es menor o igual
        } else {
            currentBidDisplay.style.color = "blue"; // Cambiar a azul si hay oferta
        }

        currentBidDisplay.textContent = `OFERTA ACTUAL: $${currentBid}`;
        bidButtons.forEach(button => {
            const percentage = parseFloat(button.getAttribute("data-percentage"));
            const bidValue = Math.floor(currentBid * percentage);
            button.textContent = `$${bidValue}`;
            button.setAttribute("data-amount", bidValue);
        });
    }

    // Evento click para los botones de oferta
    bidButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bidAmount = parseInt(this.getAttribute("data-amount"), 10);
            currentBid += bidAmount; // Añadir la oferta actual al monto ofertado
            updateBidValues(); // Actualizar valores de oferta
            bidInstruction.style.display = "none"; // Ocultar mensaje de instrucción
        });
    });

    // Evento click para actualizar el valor del lote
    updateLotBtn.addEventListener("click", function () {
        currentBid = parseInt(lotInput.value, 10); // Restablecer la oferta actual al nuevo valor del lote
        updateBidValues(); // Actualizar valores de oferta con el nuevo valor del lote
    });

    // Mostrar mensaje de instrucción inicial
    bidInstruction.style.display = "block";

    // Inicializar los valores de la oferta actual y los botones al cargar la página
    updateBidValues();
});

