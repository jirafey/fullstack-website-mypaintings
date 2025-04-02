document.addEventListener("DOMContentLoaded", function () {
    const orders = document.querySelector(".orders");
    const loadOrdersButton = document.getElementById("loadOrders");

    function loadOrders() {
        fetch("orders.json")
            .then(response => response.json())
            .then(data => {
                data.zamowienia.forEach(order => {
                    const orderHTML = `
                        <div class="col-md-6 d-flex align-items-center mb-4 order-item">
                            <div class="me-3">
                                <img src="${order.image_url}" class="img-fluid rounded" style="height: 150px; width: 150px;" alt="Painting">
                            </div>
                            <div class="col-md-9">
                                <p><strong>Bought on:</strong> ${order.bought_on}</p>
                                <p><strong>Price:</strong> ${order.price}</p>
                                <p><strong>Hotel:</strong> <span class="lightblue">${order.hotel}</span></p>
                                <p><strong>Status:</strong> <span class="status-label">${order.status}</span></p>
                                <div class="d-flex align-items-center"> 
                                </div>
                            </div>
                        </div>
                    `;
                    orders.insertAdjacentHTML('beforeend', orderHTML);
                });

                document.querySelectorAll('.status-label').forEach(label => {
                    if (label.textContent.includes('Waiting for payment')) label.style.color = 'red';
                    if (label.textContent.includes('Waiting to be sent')) label.style.color = 'orange';
                    if (label.textContent.includes('Sent by the hotel')) label.style.color = 'green';
                    if (label.textContent.includes('Confirmed')) label.style.color = 'blue';
                });
            })
        }
        console.log("TEST IF JS WORKS");
    loadOrdersButton.addEventListener("click", loadOrders);
});
