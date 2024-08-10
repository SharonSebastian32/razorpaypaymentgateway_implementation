document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var contact = document.getElementById("contact").value;
  var amount = document.getElementById("amount").value * 100;
 
  var options = {
    key: "rzp_test_gCzBTQcb92KH3e",  
    amount: amount.toString(),  
    currency: "INR",
    name: "Ozwalz Events",
    description: "Thank You for booking event with Ozwalz Events",
    image: "./assets/images/logo.png",

    handler: function (response) {
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
      color: "##5D001E",
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.open();
});

 
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
