import ProductById from "@/components/ProductByid";

const ProductDetails = async ({params}:{params: {id:string}}) => {
    const id = params.id;
    return (
        <div>
           <ProductById id={params.id} />
        </div>
    )
}

export default ProductDetails;