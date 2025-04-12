window.onload = function() {
    const ordersList = document.getElementById("ordersList");
    // Retrieve orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length > 0) {
        // Clear previous content and dynamically render orders
        ordersList.innerHTML = ""; 
        orders.forEach((order, index) => {
            const orderDiv = document.createElement("div");
            orderDiv.classList.add("order-item");
            orderDiv.innerHTML = `
                <p><strong>Staff Name:</strong> ${order.staffName}</p>
                <p><strong>Description:</strong> ${order.description}</p>
                <p><strong>Amount:</strong> ${order.amount} Robux</p>
                <p><strong>Amount in USD:</strong> $${order.usdAmount}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <button onclick="editOrder(${index})">Edit</button>
                <button onclick="deleteOrder(${index})">Delete</button>
            `;
            ordersList.appendChild(orderDiv);
        });
    } else {
        // If no orders, show this message
        ordersList.innerHTML = "<p>No orders found.</p>";
    }
};

// Edit order function
function editOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const order = orders[index];

    // Fill the modal fields with order data
    document.getElementById("editStaffName").value = order.staffName;
    document.getElementById("editDescription").value = order.description;
    document.getElementById("editAmount").value = order.amount;
    document.getElementById("editUSD").value = order.usdAmount;
    document.getElementById("editStatus").value = order.status;

    // Show the modal for editing
    document.getElementById("editOrderModal").style.display = "block";

    // Save changes when clicking Save
    document.getElementById("saveOrderChanges").onclick = function() {
        order.staffName = document.getElementById("editStaffName").value;
        order.description = document.getElementById("editDescription").value;
        order.amount = document.getElementById("editAmount").value;
        order.usdAmount = document.getElementById("editUSD").value;
        order.status = document.getElementById("editStatus").value;

        // Save the updated order back to localStorage
        orders[index] = order;
        localStorage.setItem("orders", JSON.stringify(orders));

        location.reload(); // Reload the page to reflect the changes
    };

    // Delete the order when clicking Delete
    document.getElementById("deleteOrder").onclick = function() {
        orders.splice(index, 1); // Remove the order
        localStorage.setItem("orders", JSON.stringify(orders)); // Update localStorage
        location.reload(); // Reload the page to reflect the changes
    };
}

// Delete order function
function deleteOrder(index) {
    const orders = JSON.parse(localStorage.getItem("orders"));
    orders.splice(index, 1); // Remove the order from the array
    localStorage.setItem("orders", JSON.stringify(orders)); // Update the localStorage with the new array

    location.reload(); // Reload the page to reflect the changes
}

// Close the modal
function closeModal() {
    document.getElementById("editOrderModal").style.display = "none";
}
