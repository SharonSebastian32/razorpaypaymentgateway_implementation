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
