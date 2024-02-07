import {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export function DataBinding() {
    const [product, setProduct] = useState({})

    const toggleOffers =()=>{
        setShowAdditionalOffers(!showAdditionalOffers);
        setButtonElement(null)
    }
    const [showAdditionalOffers, setShowAdditionalOffers] = useState(false)
    const [buttonElement, setButtonElement] = useState( <button onClick={toggleOffers} className='text-primary cursor-pointe bg-transparent border-0' >View 4 more offers</button>)


    function LoadProduct(){
        var http = new XMLHttpRequest();
        http.open("get","product.json",true)
        http.send()

        http.onreadystatechange = function(){
            if(http.readyState === 4){
                setProduct(JSON.parse(http.responseText))
            }
        }
    }

    useEffect(()=>{ LoadProduct() },[])


     return (
        <div className='container-fluid'>
            <div className='row'>
                 <div className='mt-4 col-3'>
                    <img src={product.image} alt=""/>
                 </div>
                 <div className='col-9 mt-4'>
                    <div className='h3'>{product.title}</div>
                    <div> 
                        <span className='badge bg-success text-white p-2'> {product.rating.rate} <span 
                         className='bi bi-star-fill'></span> </span>
                         <span class="ms-3 text-secondary fw-bold"> {product.rating.ratings.toLocaleString()} Ratings  & {product.rating.reviews} Reviews </span>
                         <span className='ms-3'><img src={product.logo} alt=""/></span>
                    </div>

                    <div className='mt-3'>
                        <div className='h2 fw-bold text-success'>
                            {product.price.mrp.toLocaleString('en-in',{style:'currency',currency:"INR"})} 
                            <span className='h5 ms-3 text-secondary text-decoration-line-through'>{product.price.old.toLocaleString('en-in',{style:'currency',currency:"INR"})}</span>
                            <span className='h6 ms-3'>{product.price.discount}% off</span>
                            <i class="ms-3 bi bi-info-circle h6 text-secondary"  ></i>
                            
                        </div>
                    </div>
                    
                    <div className='text-dark'>{product.price.packagingFee.toLocaleString('en-in',{style:'currency',currency:'INR', minimumFractionDigits: 0, maximumFractionDigits: 0})} Secured Packaging Fee </div>

                    <div className='mt-3'>
                        <div className='h5 mb-2'>Available offers</div>
                        <ul className='list-unstyled'>
                            {product.offers.map(offer=> <li className='bi bi-tag-fill text-success my-2'> 
                            <span className='text-dark ms-2'> <span className='fw-bold ms-1'>Bank Offer</span> {offer} <span className='text-primary fw-300 ms-1'>T&C</span> </span></li> )}
                        </ul>
                    </div>

                   {buttonElement}
                   {showAdditionalOffers && (
                       <div className='mt-3'>
                       <div className='h5 mb-2'>Available offers</div>
                       <ul className='list-unstyled'>
                           {product.offers.map(offer=> <li className='bi bi-tag-fill text-success my-2'> 
                           <span className='text-dark ms-2'> <span className='fw-bold ms-1'>Bank Offer</span> {offer} <span className='text-primary fw-300 ms-1'>T&C</span> </span></li> )}
                       </ul>
                       </div>
                   )}

                 </div>
            </div>
        </div>
     )
}
