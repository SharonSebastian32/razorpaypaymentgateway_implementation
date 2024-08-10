document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var contact = document.getElementById("contact").value;
  var amount = document.getElementById("amount").value * 100;
  // Convert amount to paise

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
      color: "#red",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
});

// API FOR FETCHING EVENTNAME
 
let eventData;

fetch("./JSON/event.json")
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




function saveFormData(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const amount = document.getElementById("amount").value;
  const selectedEventId = document.getElementById("choices").value;
  const selectedEvent = eventData.find((event) => event.id === selectedEventId);

  const formData = {
    name,
    email,
    contact,
    amount,
    eventId: selectedEvent.id,
    eventName: selectedEvent.eventName,
  };

  // Save the form data to a JSON file
  fetch("JSON/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Form data saved:", data);
      // You can add additional logic here, such as redirecting to a success page
    })
    .catch((error) => {
      console.error("Error saving form data:", error);
    });
}