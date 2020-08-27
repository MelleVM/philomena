import React, {useState, useEffect, useContext} from "react"
import axios from 'axios'
import Button from "../components/Button"
import Modal from "../misc/Modal"
import {Context} from "../Context"

function Products(props) {
    const [isCreateProductModal, setIsCreateProductModal] = useState(false)
    const [isEditProductModal, setIsEditProductModal] = useState(false)
    const [editProductInfo, setEditProductInfo] = useState({id: "", title: "", price: "", type: "", category: "", length: "30"})
    const [showDropdown, setShowDropdown] = useState({
        active: false,
        id: null
    })
    const [createProductInfo, setCreateProductInfo] = useState({title: "", price: "", type: "", category: "", length: "30"})
    const {products, setProducts, settings} = useContext(Context)

    function createProduct(e) {
        e.preventDefault()

        if (createProductInfo.title !== "" && createProductInfo.price !== "" && createProductInfo.type !== "" && createProductInfo.category !== "") {
            // makes an api call to create a product
            axios.post(`${settings.API_URL}/products/add`, createProductInfo)
                .then(res => console.log(res.data))
                .then(window.location = '/products')
            }
    }

    function editProduct(e) {
        e.preventDefault();

        // makes an api call to edit a product 
        axios.post(`${settings.API_URL}/products/update/` + editProductInfo.id, editProductInfo)
        .then(res => console.log(res.data));

        window.location = '/products';
    }

    function deleteProduct(id) {
        // makes an api call to delete a product
        axios.delete(`${settings.API_URL}/products/` + id)
            .then(response => {
                console.log(response.data)
            })

        setProducts(prevProducts => prevProducts.filter(prev => prev._id !== id))

        // Every time a product gets deleted it also needs to 
        // set the state for the dropdown to false.
        setShowDropdown(prev => ({...prev, active: false}))
    }

    const listProducts = products.map(product => (
        <>
            <li>
                <div className="pull-left">
                    {product.type === "hair" ? <i className="ri-scissors-fill" /> :
                    <i className="fas fa-highlighter" />}
                </div>
                <div className="pull-right">
                    <span>{product.title} <b>({product.category})</b></span>
                    <p>{product._id}</p>

                    <i onClick={() => setShowDropdown(prev => ({active: !prev.active, id: product._id}))} className={showDropdown.id === product._id && showDropdown.active ? "ri-close-fill" : "ri-more-2-fill"}></i>
                    <ul className={showDropdown.id === product._id && showDropdown.active ? "active dropdown" : "dropdown"}>
                        <li onClick={() => deleteProduct(product._id)}>
                            <span>Remove</span>
                        </li>
                        <li onClick={() => editProductModal(product._id) + setIsEditProductModal(true)}>
                            <span>Edit</span> 
                        </li>
                    </ul>
                </div>
            </li> 
        </>
    ))

    function handleChange(event) {
        const {value, name, className} = event.target

        if(className === "input-edit") {
            setEditProductInfo(prevEditProduct => ({...prevEditProduct, [name]: value}))
        } else if (className === "input-create") {
            console.log(event.target)
            setCreateProductInfo(prevCreateProduct => ({...prevCreateProduct, [name]: value}))
        }
    }

    const createProductModal = isCreateProductModal && (
                <Modal disabled={createProductInfo.title === "" || createProductInfo.price === "" || createProductInfo.type === "" || createProductInfo.category === ""} submitEvent={createProduct} close={() => setIsCreateProductModal(false)}>
                    <h3>New Product</h3>
                    <div className="group-big">
                        <div className="group">
                            <label>title</label>
                            <input className="input-create" name="title" value={createProductInfo.title} onChange={handleChange}/>
                        </div>
                    
                        <div className="group">
                            <label>Price</label>
                            <input className="input-create" name="price" value={createProductInfo.price} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Type</label>
                            <select className="input-create" name="type" value={createProductInfo.type} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="nails">Nails</option>
                                <option value="hair">Hair</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Category</label>
                            <select disabled={createProductInfo.type === ""} className="input-create" name="category" value={createProductInfo.category} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                {createProductInfo.type === "hair" && (
                                    <>
                                        <option value="dames">Dames</option>
                                        <option value="heren">Heren</option>
                                        <option value="kinderen t/m 11 jaar">Kinderen t/m 11 jaar</option>
                                        <option value="kinderen 12 t/m 15 jaar">Kinderen 12 t/m 15 jaar</option>
                                    </>
                                )}
                                {createProductInfo.type === "nails" && (
                                    <>
                                        <option value="nieuwe set">Nieuwe set</option>
                                        <option value="nabehandeling">Nabehandeling</option>
                                        <option value="handen">Handen</option>
                                        <option value="voeten">Voeten</option>    
                                    </>     
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Length (Minutes)</label>
                            <input className="input-create" name="length" value={createProductInfo.length} onChange={handleChange}/>
                        </div>
                    </div>
                </Modal>
            )

    function editProductModal(id) {
        // finds the right Product to edit by using
        // 'filter' and 'map' 
        products.filter(prev => prev._id === id).map(prev => setEditProductInfo({id: prev._id, title: prev.title, price: prev.price, type: prev.type, category: prev.category, length: prev.length}))     
    }

    useEffect(() => {
        props.setActivePage("products")
    })

    return (
        <>
            {createProductModal}
            
            {isEditProductModal && <Modal disabled={editProductInfo.title === "" || editProductInfo.price === "" || editProductInfo.type === "" || editProductInfo.category === ""} submitEvent={editProduct} close={() => setIsEditProductModal(false)}>
                <h3>Edit Product</h3>
                    <div className="group-big">
                    <div className="group">
                        <label>Title</label>
                        <input className="input-edit" name="title" value={editProductInfo.title} onChange={handleChange}/>
                    </div>
                
                    <div className="group">
                        <label>Price</label>
                        <input className="input-edit" name="price" value={editProductInfo.price} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Type</label>
                            <select className="input-edit" name="type" value={editProductInfo.type} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                <option value="nails">Nails</option>
                                <option value="hair">Hair</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Category</label>
                            <select disabled={editProductInfo.type === ""} className="input-edit" name="category" value={editProductInfo.category} onChange={handleChange}>
                                <option value="" hidden disabled="disabled">Please select...</option>
                                {editProductInfo.type === "hair" && (
                                    <>
                                        <option value="dames">Dames</option>
                                        <option value="heren">Heren</option>
                                        <option value="kinderen t/m 11 jaar">Kinderen t/m 11 jaar</option>
                                        <option value="kinderen 12 t/m 15 jaar">Kinderen 12 t/m 15 jaar</option>
                                    </>
                                )}
                                {editProductInfo.type === "nails" && (
                                    <>
                                        <option value="nieuwe set">Nieuwe set</option>
                                        <option value="nabehandeling">Nabehandeling</option>
                                        <option value="handen">Handen</option>
                                        <option value="voeten">Voeten</option>     
                                    </>     
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="group-big">
                        <div className="group">
                            <label>Length (Minutes)</label>
                            <input className="input-edit" name="length" value={editProductInfo.length} onChange={handleChange}/>
                        </div>
                    </div>
            </Modal>}

            <div className="list-container-parent">
                <div className="list-container list-container-1">
                    <h3>All Products</h3>
                    <Button clickEvent={() => setIsCreateProductModal(true)} width="120px" fontSize="16px" borderRadius={0} background="#3840B1" padding="5px" value="Create New" />
                    <ul className="all-list">
                        {listProducts}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Products