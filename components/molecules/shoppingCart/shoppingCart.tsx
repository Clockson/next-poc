import { Product } from "@/models/product.model";
import ProductLine from "@/components/molecules/productLine/productLine"; ''
import Link from 'next/link';

const ShoppingList = ({ list }: {list: Product[]}) => {
    return <ul>
        {list.map((item) => (
            <li key={item.id}>
                <Link href={"/products/" + item.id}>
                    <ProductLine product={item}></ProductLine>
                </Link>
            </li>
        ))}
    </ul>
}

export default ShoppingList;