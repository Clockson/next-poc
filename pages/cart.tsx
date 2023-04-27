import Layout from "../components/page/layout/layout";
import { Product } from '@/models/product.model';

import { withIronSessionSsr } from "iron-session/next";
import { ProductService } from "@/utils/ProductService";
import { RedisCacheService } from "@/utils/RedisCacheService";
import ShoppingList from "@/components/molecules/shoppingCart/shoppingCart";

declare module "iron-session" { 
    interface IronSessionData { 
      list?: Product[]; 
    } 
  } 

export default function Cart({ products }: any) {
    return (
        <Layout>
            <ShoppingList list={products}></ShoppingList>
        </Layout>
    );
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context) {
        const cacheService = new RedisCacheService();
        await cacheService.Connect();
        const productService = new ProductService(cacheService);
        let prodList: Product[] = [];

        if (context.req.session.list) {
            prodList = context.req.session.list;
        }

        if (context.query?.productId) {
            prodList.push(productService.GetProductById(parseInt(context.query?.productId as string)))
        }

        context.req.session.list = prodList;
        await context.req.session.save();
  
      return {
        props: {
          products: prodList,
        },
      };
    },
    {
      cookieName: "myapp_cookiename",
      password: "complex_password_at_least_32_characters_long",
      // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    },
  );