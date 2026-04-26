window.addEventListener('scroll',()=>{
 document.querySelector('.navbar').style.background = window.scrollY>20 ? 'rgba(0,0,0,.65)' : 'transparent';
});

function payNow(){
 const options={
  key:'rzp_test_SiDdmw8bHcgVgT',
  amount:19900,
  currency:'INR',
  name:'Preeti Maurya',
  description:'Signed Copy Order',
  handler:function(response){alert('Payment Successful!');},
  prefill:{
   name:document.getElementById('name').value,
   contact:document.getElementById('phone').value
  },
  notes:{
   address:document.getElementById('address').value+', '+document.getElementById('city').value+' - '+document.getElementById('pincode').value
  },
  theme:{color:'#c79a4b'}
 };
 const rzp=new Razorpay(options);rzp.open();
}

const SHEET_URL = "https://script.google.com/macros/s/AKfycbz2x2zCzfymBXI1QhG0qGJ--MotFrSvDD9P5cWGbL6I7sEAq7sPEYnFwjJXiglN_VI0/exec";

document.getElementById("payBtn").onclick = function () {

  const name = document.getElementById("custName").value;
  const email = document.getElementById("custEmail").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const qty = parseInt(document.getElementById("qty").value || 1);
  const amount = qty * 199;

  const options = {
    key: "rzp_test_SiDdmw8bHcgVgT",
    amount: amount * 100,
    currency: "INR",
    name: "Preeti Maurya",
    description: "Signed Copy Order",

    handler: function (response) {

      fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          qty,
          amount,
          paymentId: response.razorpay_payment_id
        })
      })
      .then(res => res.json())
      .then(data => {
        alert("Payment Successful! Order Confirmed.");
        window.location.href = "thankyou.html";
      })
      .catch(err => {
        alert("Payment successful, but sync failed.");
      });

    },

    prefill: {
      name,
      email,
      contact: phone
    },

    theme: {
      color: "#d4a24d"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};