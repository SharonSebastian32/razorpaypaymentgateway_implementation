<script src="https://checkout.razorpay.com/v1/checkout.js"></script>;

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var contact = document.getElementById("contact").value;
  var amount = document.getElementById("amount").value * 100; // Convert amount to paise

  var options = {
    key: "rzp_test_gCzBTQcb92KH3e", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(), // Amount in currency subunits (100 paise = 1 INR)
    currency: "INR",
    name: "Ozwalz Events",
    description: "Thank You for booking event with Ozwalz Events",
    image: "./assets/images/logo.png",

    handler: function (response) {
      // Handle the response from Razorpay after payment
      // You can redirect to another page or save the response to your database
      alert("Payment successful!");
      clearForm(); // Clear the form after successful payment
    },
    prefill: {
      name: name,
      email: email,
      contact: contact,
    },
    notes: {
      description: "Thank You for booking event with Ozwalz Events",
    },
    theme: {
      color: "#5D001E",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
});

// API FOR FETCHING EVENTNAME
let eventData;

fetch("../")
  .then((response) => response.json())
  .then((data) => {
    eventData = data;

    // Populate the select element with event names
    const selectElement = document.getElementById("choices");
    data.forEach((event) => {
      const option = document.createElement("option");
      option.value = event.id;
      option.text = event.eventName;
      selectElement.add(option);
    });

    // Add event listener to the select element
    selectElement.addEventListener("change", updatePriceInput);
  })
  .catch((error) => console.error("Error:", error));

function updatePriceInput() {
  const selectedEventId = document.getElementById("choices").value;
  const selectedEvent = eventData.find((event) => event.id === selectedEventId);

  if (selectedEvent) {
    document.getElementById("amount").value = selectedEvent.price.basePrice;
  } else {
    document.getElementById("amount").value = "";
  }
}

// Function to clear the form
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contact").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("choices").selectedIndex = 0;
}
