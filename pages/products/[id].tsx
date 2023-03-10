import { GetProduct, LoadJSONFromFile } from '../../utils/dataloader';
import Layout from "../../components/page/layout/layout";
import ProductInfoFull from "../../components/molecules/productInfoFull/productInfoFull";

export default function Product({ productData }:any) {
    return (
        <Layout>
            <ProductInfoFull product={productData}></ProductInfoFull>
        </Layout>
    );
  }

export async function getStaticPaths() {
    const products = LoadJSONFromFile('products.json');
    const paths = products.products.map((product:any) => {
        return {
            params: {
                "id": product.id.toString()
            }
        }
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    const productData = GetProduct(params.id);

    return {
        props: {
            productData,
        },
    };
}