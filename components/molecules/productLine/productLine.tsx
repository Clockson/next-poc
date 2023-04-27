import { Product } from "@/models/product.model";

const ProductLine = ({ product }: { product: Product }) => {
    return <div>
        {product.productName}
    </div>
}

export default ProductLine;