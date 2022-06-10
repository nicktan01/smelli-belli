import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
    const { sku } = useParams();
    const BASE_URL = 'http://localhost:8100/api/products'
    
    const [name, setCurrentItemName] = useState([]);
    const [image, setCurrentImage] = useState([]);
    const [size, setCurrentSize] = useState([]);
    const [price, setCurrentPrice] = useState([]);
    const [scent1, setCurrentScent1] = useState([]);
    const [scent2, setCurrentScent2] = useState([]);
    const [description, setCurrentDescription] = useState([]);

    

    useEffect(() => {
        const productUrl = `${BASE_URL}/${sku}/`;
        fetch(productUrl)
            .then((res) => res.json())
            .then((data) => {
                setCurrentItemName(data.name);
                setCurrentImage(data.image);
                setCurrentSize(data.size);
                setCurrentPrice(data.price);
                setCurrentScent1(data.scent1);
                setCurrentScent2(data.scent2);
                setCurrentDescription(data.description)
            });
    }, [sku]);

    return (
        <>
        <div className="container">
          <div className="row">
            <img src={ image } style={{ width: 400 }}/>
            </div>
            <div className="media-body">
                <div className="media-heading">
                    <h3>{ name }</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" backgroundColor="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
                </div>
                <h4>${ price }  -  { size }</h4>
                <p>{ description }</p>
                <p> Primary Scent: { scent1 }</p>
                <p> Secondary Scent: { scent2 }</p>
            </div>
            </div>
        </>
      );
    
}

export default ProductDetails;