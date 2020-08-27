import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../../Context"
import axios from 'axios'

function Step1(props) {
    const display = props.enabled ? {display: "block"} : {display: "none"}
    const [products, setProducts] = useState([])
    const {settings} = useContext(Context)

    function handleChange(e) {
        const {value, className} = e.target

        if(className === "service") {
            props.setService(value)
        }
        
        // else if (className === "product") {
        //     props.setProduct(value)
        //     console.log(value)
        // }
    }

    function getProducts() {
        axios.get(`${settings.API_URL}/products/`)
            .then(response => {
                setProducts(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function productsList(value) {
        const list = products.filter(product => product.category === value).map(product => (
            <label className="group one-line">
                <input value={product._id} onChange={() => props.setProduct({id: product._id, length: product.length ? product.length : "30"})} className="product" name="product" type="radio" /> {product.title}
                <span className="checkmark"></span>
            </label>
        ))

        return list
    }
    
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div style={display}>
            <div className="group two-line">
                <h3>Preferences</h3>
                <select className="service" value={props.service} onChange={handleChange} name="service">
                    <option value="" hidden disabled="disabled">Select a service...</option>
                    <option value="hair">Hair</option>
                    <option value="nails">Nails</option>
                </select>
            </div>

            {props.service === "hair" && (
                <>
                    <h4>Dames</h4>
                    {productsList("dames")}
                    <h4>Heren</h4>
                    {productsList("heren")}
                    <h4>Kinderen t/m 11 jaar</h4>
                    {productsList("kinderen t/m 11 jaar")}
                    <h4>Kinderen 12 t/m 15 jaar</h4>
                    {productsList("kinderen 12 t/m 15 jaar")}
                </>
            )} 

            {props.service === "nails" && (
                <>
                    <h4>Nieuwe set</h4>
                    {productsList("nieuwe set")}
                    <h4>Nabehandeling</h4>
                    {productsList("nabehandeling")}
                    <h4>Handen</h4>
                    {productsList("handen")}
                    <h4>Voeten</h4>
                    {productsList("voeten")}
                </>
            )}  

            {/* <Button fontSize="20px" opacity={props.inputsFilled.step1 ? 1 : 0.5} clickEvent={props.nextPage} isDisabled={props.inputsFilled.step1 ? false : true} width="unset" padding="12px 50px" background={props.inputsFilled.step1 ? "#3840B1" : "gray"} color="white" borderRadius={0} value="Next" /> */}
        </div>
    )
}

export default Step1