import React from "react";
import { useContext } from "react";
import { cartContextProduct } from "../../Context/CartContextPro";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import cartStyle from './Cart.module.css'
import { Helmet } from "react-helmet";

export default function Cart() {



  const Navigation = useNavigate();

  const {
    numOfCartItems,
    updateCount,
    totalCartPrice,
    allProducts,
    deleteProduct,
    clearProduct,
  } = useContext(cartContextProduct);
  console.log("pro", allProducts);



  async function updateProductCount(id, newCount) {
    const res = await updateCount(id, newCount);
    if (res) {
      toast.success("product updated successfully", { position: "top-center" });
    } else {
      toast.error("Error occurred", { position: "top-center" });
    }
  }

  async function deleteProductFunc(id) {
    const res = await deleteProduct(id);
    if (res) {
      toast.success("product delete successfully", { position: "top-left" });
    } else {
      toast.error("Error occurred", { position: "top-center" });
    }
  }
  if (!allProducts) {
    return (
      <>
        <div className="d-flex vh-100 bg-secondary bg-opacity-50 justify-content-center align-items-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperClass=""
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Cart Component</title>
      </Helmet>
      {allProducts && allProducts.length ? (
        <div className="container my-5">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className={`fw-normal h2 ${cartStyle.line}`}>Shop Cart :</h2>
            <Link className="fw-normal h5 text-black text-decoration-none" to="/payment">
              <h5>
                Number Of Items: {numOfCartItems}
              </h5>
              <button className="btn btn-outline-primary">CheckOut</button>
            </Link>
          </div>

          <h5 className="mainColor fw-normal h5 mb-4">
            Total cart price: {totalCartPrice} EGP
          </h5>

          {/* You can add a check to ensure that allProducts is not null or undefined before using the map function. */}
          {allProducts &&
            allProducts.map((product, indx) => (
              <div
                key={indx}
                className="row align-items-center border-bottom border-1 border-secondery p-3 bg-light  fw-normal mx-1 pt-3"
              >
                <div className="col-md-1">
                  <figure>
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt={product.title}
                    />
                  </figure>
                </div>
                <div className="col-md-9">
                  <article>
                    <h3 className="h4">{product.product.title}</h3>
                    <h5 className="h5 mainColor">Price: {product.price} EGP</h5>

                    <div
                      onClick={() => deleteProductFunc(product.product.id)}
                      className="h6 text-danger fw-light cursor-pointer"
                    >
                      <i className="fa-solid fa-trash-can me-2 text-danger"></i>
                      Remove
                    </div>
                  </article>
                </div>
                <div className="col-md-2">
                  <div>
                    <button
                      onClick={() =>
                        updateProductCount(
                          product.product.id,
                          product.count + 1
                        )
                      }
                      className="btn btn-outline-success border-2 fw-bold"
                    >
                      +
                    </button>
                    <span className="mx-2 h5">{product.count}</span>
                    <button
                      disabled={product.count == 1}
                      onClick={() =>
                        updateProductCount(
                          product.product.id,
                          product.count - 1
                        )
                      }
                      className="btn btn-outline-success border-2 fw-bold"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}

          <div className="bg-light py-5 mx-1 text-center">
            <button onClick={clearProduct} className="btn btn-outline-danger cursor-pointer">
              clear All Product
            </button>
          </div>
        </div>
      ) : (
        setTimeout(() => {
          Navigation("/product");
        }, 1500)
      )}
    </>
  );
}
