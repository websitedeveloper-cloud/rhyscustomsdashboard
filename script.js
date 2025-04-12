// Function to display the username at the top right if it exists in localStorage
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem('username');
  
  if (username) {
    // Show the username on the top right (assuming there's a span with id 'profile')
    document.getElementById('profile').textContent = username;
  } else {
    console.log("No username found in localStorage");
  }

  // Event listener for logging an order
  document.getElementById("log-order-button").addEventListener("click", function () {
    // Retrieve input field values
    const staffName = document.getElementById("staff-name").value;
    const description = document.getElementById("order-description").value;
    const amount = document.getElementById("order-amount").value;
    const usdAmount = document.getElementById("order-usd").value;
    const status = document.getElementById("order-status").value;

    // Check if all fields are filled
    if (!staffName || !description || !amount || !usdAmount) {
      // Show error message if fields are empty
      document.getElementById("error-message").innerText = "All fields are required!";
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      staffName,
      description,
      amount,
      usdAmount,
      status,
    };

    // Get existing orders from localStorage or initialize an empty array
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order to the list
    orders.push(order);

    // Save updated orders back to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Show toast notification for order success
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    // Hide toast after 3 seconds
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);

    // Clear the input fields after logging the order
    document.getElementById("staff-name").value = "";
    document.getElementById("order-description").value = "";
    document.getElementById("order-amount").value = "";
    document.getElementById("order-usd").value = "";
    document.getElementById("order-status").value = "pending";
  });
});
