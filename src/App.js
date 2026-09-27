import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

import {
  PaddleCheckout,
  openPaddleCheckout
} from "./paddlecheckout";


function App() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");


  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("product_id");


    if (error) {

      console.error("Error fetching products:", error);

      return;
    }


    console.log("Products from Supabase:", data);

    setProducts(data || []);
  };


  // ================= SEARCH =================

  const filteredProducts = products.filter((product) =>

    product.name
      .toLowerCase()
      .includes(search.toLowerCase())

  );


  return (

    <div className="amazon">


      {/* ================= PADDLE ================= */}

      <PaddleCheckout />


      {/* ================= TOP HEADER ================= */}

      <header className="top-header">


        <div className="amazon-logo">

          NiteSea

          <span>⌁</span>

        </div>


        <div className="location">

          <small>
            Deliver to
          </small>

          <strong>
            Pakistan
          </strong>

        </div>


        <div className="search-container">


          <select>

            <option>
              All
            </option>

            <option>
              Books
            </option>

            <option>
              Courses
            </option>

            <option>
              Templates
            </option>

            <option>
              Software
            </option>

          </select>


          <input
            type="text"
            placeholder="Search NiteSea"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <button>
            🔍
          </button>


        </div>


        <div className="language">
          EN ▾
        </div>


        <div className="account">

          <small>
            Hello, sign in
          </small>

          <strong>
            Account & Lists ▾
          </strong>

        </div>


        <div className="orders">

          <small>
            Returns
          </small>

          <strong>
            & Orders
          </strong>

        </div>


        <div className="cart">

          🛒

          <b>
            Cart
          </b>

        </div>


      </header>



      {/* ================= NAV ================= */}

      <nav className="nav">


        <div className="nav-all">

          ☰ <b>All</b>

        </div>


        <div>
          Today's Deals
        </div>


        <div>
          Customer Service
        </div>


        <div>
          Registry
        </div>


        <div>
          Gift Cards
        </div>


        <div>
          Sell
        </div>


        <div>
          Books
        </div>


        <div>
          Courses
        </div>


        <div>
          Templates
        </div>


      </nav>



      {/* ================= HERO ================= */}

      <section className="hero">


        <div className="hero-overlay">


          <h1>
            Welcome to NiteSea
          </h1>


          <p>

            Discover thousands of digital
            products and useful resources.

          </p>


          <button>
            Shop now
          </button>


        </div>


      </section>



      {/* ================= CATEGORIES ================= */}

      <section className="category-section">


        <div className="category-box">

          <h2>
            Digital Books
          </h2>

          <div className="big-icon">
            📚
          </div>

          <a href="#products">
            Shop books
          </a>

        </div>



        <div className="category-box">

          <h2>
            Online Courses
          </h2>

          <div className="big-icon">
            🎓
          </div>

          <a href="#products">
            Explore courses
          </a>

        </div>



        <div className="category-box">

          <h2>
            Templates
          </h2>

          <div className="big-icon">
            📄
          </div>

          <a href="#products">
            Shop templates
          </a>

        </div>



        <div className="category-box">

          <h2>
            Software & Tools
          </h2>

          <div className="big-icon">
            💻
          </div>

          <a href="#products">
            Explore software
          </a>

        </div>


      </section>



      {/* ================= PRODUCTS ================= */}

      <section
        className="product-section"
        id="products"
      >


        <div className="section-title">


          <h2>
            Popular products
          </h2>


          <a href="#products">
            See all
          </a>


        </div>



        {filteredProducts.length === 0 ? (


          <div className="no-products">

            No products found.

          </div>


        ) : (


          <div className="product-row">


            {filteredProducts.map((product) => (


              <div
                className="product-card"
                key={product.product_id}
              >


                {/* PRODUCT IMAGE */}

                <div className="product-image">


                  <img
                    src={product.image}
                    alt={product.name}

                    onError={(e) => {

                      e.target.src =
                        "https://placehold.co/400x400?text=No+Image";

                    }}

                  />


                </div>



                {/* PRODUCT CONTENT */}

                <div className="product-content">


                  <h3>
                    {product.name}
                  </h3>



                  {/* RATING */}

                  <div className="rating">


                    <span>
                      ★★★★★
                    </span>


                    <a>
                      4.7
                    </a>


                  </div>



                  {/* PRODUCT ID */}

                  <p className="product-id">

                    Product ID:
                    {" "}
                    {product.product_id}

                  </p>



                  {/* PRICE */}

                  <div className="price">

                    <sup>
                      $
                    </sup>

                    {Number(
                      product.price || 0
                    ).toFixed(2)}

                  </div>



                  {/* DELIVERY */}

                  <p className="instant">

                    ✓ Instant digital delivery

                  </p>



                  {/* ADD TO CART */}

                  <button
                    className="cart-btn"
                  >

                    Add to Cart

                  </button>



                  {/* BUY NOW */}

                  <button
                    className="buy-btn"
                    onClick={() => {
                      console.log("Selected product:", product);

                      console.log(
                        "Supabase product_id:",
                        product.product_id
                      );

                      openPaddleCheckout(
                        product.product_id
                      );
                    }}
                  >
                    Buy Now
                  </button>

                </div>


              </div>

            ))}


          </div>


        )}


      </section>



      {/* ================= RECOMMENDED ================= */}

      <section className="product-section">


        <div className="section-title">


          <h2>
            Recommended for you
          </h2>


          <a href="#products">
            Explore more
          </a>


        </div>



        <div className="product-row">


          {products
            .slice(0, 6)
            .map((product) => (


              <div
                className="small-product"
                key={product.product_id}
              >


                <img
                  src={product.image}
                  alt={product.name}

                  onError={(e) => {

                    e.target.src =
                      "https://placehold.co/400x400?text=No+Image";

                  }}

                />



                <h3>
                  {product.name}
                </h3>



                <div className="rating">

                  ★★★★★

                </div>



                <div className="small-price">

                  $
                  {Number(
                    product.price || 0
                  ).toFixed(2)}

                </div>


              </div>


            ))}


        </div>


      </section>



      {/* ================= BACK TO TOP ================= */}

      <div

        className="back-top"

        onClick={() =>

          window.scrollTo({

            top: 0,

            behavior: "smooth"

          })

        }

      >

        Back to top

      </div>



      {/* ================= FOOTER ================= */}

      <footer>


        <div className="footer-top">


          <div>

            <h3>
              Get to Know Us
            </h3>

            <p>
              About NiteSea
            </p>

            <p>
              Careers
            </p>

            <p>
              Contact Us
            </p>

            <p>
              Press Center
            </p>

          </div>



          <div>

            <h3>
              Make Money with Us
            </h3>

            <p>
              Sell Products
            </p>

            <p>
              Sell Digital Products
            </p>

            <p>
              Become an Affiliate
            </p>

            <p>
              Advertise Products
            </p>

          </div>



          <div>

            <h3>
              Customer Service
            </h3>

            <p>
              Your Account
            </p>

            <p>
              Your Orders
            </p>

            <p>
              Returns
            </p>

            <p>
              Help Center
            </p>

          </div>



          <div>

            <h3>
              NiteSea
            </h3>

            <p>
              Privacy
            </p>

            <p>
              Terms
            </p>

            <p>
              Refund Policy
            </p>

            <p>
              Help
            </p>

          </div>


        </div>



        <div className="footer-bottom">


          <div className="footer-logo">

            NiteSea

          </div>


          <span>

            © 2026 NiteSea

          </span>


        </div>


      </footer>


    </div>

  );

}


export default App;