import { GetProductByCategory, GetProductId } from "@/app/api/products/actions";
import AddToCart from "@/ui/AddToCart";
import { Product } from "@/types/product";

const ProductDetails = async ({params}:{params: {id:string}}) => {
    const id = params.id;
    const singleProduct: Product = await GetProductId(id);
    const relatedProducts: Product[] = await GetProductByCategory(singleProduct.category);
    const num = Math.round(singleProduct.rating.rate);
    const starArray = new Array(num).fill(0);
    return (
        <div>
            <div>
            <h1>{singleProduct.title}</h1>
            <img src={singleProduct.image} alt={singleProduct.title} />
            <p>{singleProduct.description}</p>
            <p>Price: ${singleProduct.price}</p>
            <AddToCart />
            <div>
                {starArray.map((_, index) => (
                    <span key={index}>⭐</span>
                ))}
            </div>
            </div>
            <h2>Related Products</h2>
            <ul>
                {relatedProducts.map((product) => (
                    <li key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt={product.title} />
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}

export default ProductDetails;