import { GetDealList, LoadJSONFromFile } from "./../utils/dataloader";
import Link from "next/link";
import Layout from "../components/page/layout/layout";
import { Deal } from "../models/deal.model";
import DealTile from "../components/molecules/dealTile/dealTile";
import styles from '@/styles/Home.module.css';

export default function Deals({ dealsList }: any) {
    return (
        <Layout>
            <div className={styles.mainContent}>
                {dealsList.map((deal: Deal) => (
                    <Link key={deal.id} href={"/products/" + deal.id}>
                        <DealTile deal={deal}></DealTile>
                    </Link>
                ))}

            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const dealsList = GetDealList(8);

    return {
        props: {
            dealsList,
        },
    };
}