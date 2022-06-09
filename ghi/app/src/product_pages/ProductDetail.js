import React from "react";
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
        <div className="media">
          <div className="float:left">
            <img src={ image } style={{ width: 400 }}/>
            </div>
            <div className="media-body">
                <h3 className="media-heading">{ name }</h3>
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