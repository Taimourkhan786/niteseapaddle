
// import { useEffect } from "react";

// function App() {

//   useEffect(() => {

//     // Load Paddle.js
//     const script = document.createElement("script");

//     script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
//     script.async = true;

//     script.onload = () => {

//       // Sandbox environment
//       window.Paddle.Environment.set("sandbox");

//       // Initialize Paddle
//       window.Paddle.Initialize({
//         token: "test_bf06bf1b6078d5aea35517e7db9"
//       });

//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };

//   }, []);


//   const buyProduct = () => {

//     window.Paddle.Checkout.open({

//       items: [
//         {
//           priceId: "pri_01m3f12zc7dkxcatfejsre6xfg",
//           quantity: 1
//         }
//       ]

//     });

//   };


//   return (
//     <div>

//       <h1>My Digital Product</h1>

//       <p>$10</p>

//       <button onClick={buyProduct}>
//         Buy Now
//       </button>

//     </div>
//   );
// }

// export default App;
import { useEffect } from "react";

export function PaddleCheckout() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    script.onload = () => {
      console.log("Paddle.js loaded");


      window.Paddle.Initialize({
        token: "live_ee9c13129c9127eeba31335bb73"
      });

      console.log("Paddle initialized");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}

export function openPaddleCheckout(productId) {
  console.log("Product ID from Supabase:", productId);

  if (!productId) {
    console.error("No product_id found");
    alert("Product ID is missing.");
    return;
  }

  if (!window.Paddle) {
    console.error("Paddle is not loaded");
    alert("Paddle is still loading. Please wait.");
    return;
  }

  // product_id from Supabase
  // is the same value as Paddle priceId
  const priceId = productId;

  console.log("Paddle priceId:", priceId);

  window.Paddle.Checkout.open({
    items: [
      {
        priceId: priceId,
        quantity: 1
      }
    ]
  });
}