import React, { useEffect, useState } from "react";

const Advertisement = () => {
  const [advertisedProducts, setAdvertisedProducts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/products/advertisement`)
      .then((res) => res.json())
      .then((data) => {
        setAdvertisedProducts(data);
      });
  }, []);
  // console.log(advertisedProducts);
  if (advertisedProducts) {
    return (
      <>
        {/* <h3>{advertisedProducts.length}</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {advertisedProducts.map((advertisedProduct) => (
            <div key={advertisedProduct._id} className="mx-auto">
              {!advertisedProduct.isPaid && (
                <>
                  <img
                    src={advertisedProduct.picture}
                    alt=""
                    className="w-72"
                  />
                  <h3 className="bg-gray-600 text-white text-center py-2">
                    {advertisedProduct.product_name}
                  </h3>
                </>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Advertisement;
