import { useState } from "react";

function NewProductForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    product_type: "",
    product_category: "",
    sku: "",
    price: "",
    size: "",
    scent1: "",
    scent2: "",
    quantity: "",
    image: "",
    description: "",
  });

  const handleNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handleProductTypeChange = (event) => {
    setFormData({ ...formData, product_type: event.target.value });
  };

  const handleProductCategoryChange = (event) => {
    setFormData({ ...formData, product_category: event.target.value });
  };

  const handleSkuChange = (event) => {
    setFormData({ ...formData, sku: event.target.value });
  };

  const handlePriceChange = (event) => {
    setFormData({ ...formData, price: event.target.value });
  };

  const handleSizeChange = (event) => {
    setFormData({ ...formData, size: event.target.value });
  };

  const handleScent1Change = (event) => {
    setFormData({ ...formData, scent1: event.target.value });
  };

  const handleScent2Change = (event) => {
    setFormData({ ...formData, scent2: event.target.value });
  };

  const handleQuantityChange = (event) => {
    setFormData({ ...formData, quantity: event.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setFormData({ ...formData, description: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const productUrl = "http://localhost:8100/api/products/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(productUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        product_type: "",
        product_category: "",
        sku: "",
        price: "",
        size: "",
        scent1: "",
        scent2: "",
        quantity: "",
        image: "",
        description: "",
      };
      setFormData(cleared);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add New Product</h1>
          <form onSubmit={handleSubmit} id="create-new-product-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                value={formData.name}
                placeholder="Product Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Product Name</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleProductTypeChange}
                value={formData.product_type}
                placeholder="Product Type"
                required
                name="product_type"
                id="product_type"
                className="form-control"
              >
                <option value="product_type">Select Product Type</option>
                <option value="Home">Home</option>
                <option value="Body">Body</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleProductCategoryChange}
                value={formData.product_category}
                placeholder="Product Category"
                required
                name="product_category"
                id="product_category"
                className="form-control"
              >
                <option value="product_category">
                  Select Product Category
                </option>
                <option value="Candle">Candle</option>
                <option value="Incense Stick">Incense Stick</option>
                <option value="Room Spray">Room Spray</option>
                <option value="Lotion">Lotion</option>
                <option value="Body Wash">Body Wash</option>
                <option value="Soap">Soap</option>
                <option value="Deodorant">Deodorant</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleSkuChange}
                value={formData.sku}
                placeholder="SKU"
                required
                type="text"
                name="sku"
                id="sku"
                className="form-control"
              />
              <label htmlFor="sku">SKU</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePriceChange}
                value={formData.price}
                placeholder="Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="quantity">Price</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleSizeChange}
                value={formData.size}
                placeholder="Size"
                required
                type="text"
                name="size"
                id="size"
                className="form-control"
              />
              <label htmlFor="size">Size</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleScent1Change}
                value={formData.scent1}
                placeholder="Primary Scent"
                required
                name="scent1"
                id="scent1"
                className="form-control"
              >
                <option value="scent1">Select Primary Scent</option>
                <option value="Fresh">Fresh</option>
                <option value="Amber">Amber</option>
                <option value="Floral">Floral</option>
                <option value="Woody">Woody</option>
                <option value="Fruity">Fruity</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleScent2Change}
                value={formData.scent2}
                placeholder="Secondary Scent"
                required
                name="scent2"
                id="scent2"
                className="form-control"
              >
                <option value="scent2">Select Secondary Scent</option>
                <option value="Fresh">Fresh</option>
                <option value="Amber">Amber</option>
                <option value="Floral">Floral</option>
                <option value="Woody">Woody</option>
                <option value="Fruity">Fruity</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleQuantityChange}
                value={formData.quantity}
                placeholder="Quantity"
                required
                type="number"
                name="quantity"
                id="quantity"
                className="form-control"
              />
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleImageChange}
                value={formData.image}
                placeholder="Image URL"
                type="url"
                name="image"
                id="image"
                className="form-control"
              />
              <label htmlFor="image">Image URL</label>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleDescriptionChange}
                value={formData.description}
                className="form-control"
                id="description"
                rows="3"
                name="description"
              ></textarea>
            </div>
            <button className="btn btn-success">Add New Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProductForm;
