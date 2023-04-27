import Layout from "../components/page/layout/layout";
import { Product } from '@/models/product.model';

import { ProductService } from "@/utils/ProductService";
import ShoppingList from "@/components/molecules/shoppingCart/shoppingCart";

import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';

export default function Cart({ products }: any) {
    return (
        <Layout>
            <ShoppingList list={products}></ShoppingList>
        </Layout>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    console.log("Wishlist");
    console.log(session);

    const productService = new ProductService(undefined);
    let prodList: Product[] = [];

    // if (context.req.session.list) {
    //     prodList = context.req.session.list;
    // }

    // if (context.query?.productId) {
    //     prodList.push(productService.GetProductById(parseInt(context.query?.productId as string)))
    // }

    // context.req.session.list = prodList;
    // await context.req.session.save();

    return {
        props: {
            products: prodList,
        },
    };
};