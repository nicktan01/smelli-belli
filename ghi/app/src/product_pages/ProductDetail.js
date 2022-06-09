import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { sku } = useParams();
    const BASE_URL = 'http://localhost:8100/api/products'
    
    const [name, setCurrentItemName] = useState([]);
    const [image, setCurrentImage] = useState([]);
    

    useEffect(() => {
        const productUrl = `${BASE_URL}/${sku}/`;
        fetch(productUrl)
            .then((res) => res.json())
            .then((data) => {
                setCurrentItemName(data.name);
                setCurrentImage(data.image);
            });
    }, [sku]);

    return (
        <>
          <div className="row justify-content-center">
            <h3>{ name }</h3>
            <img src={ image } style={{ width: 400 }}/>
          </div>
        </>
      );
    
}

export default ProductDetails;