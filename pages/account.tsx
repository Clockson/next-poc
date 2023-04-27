import Link from "next/link";
import Layout from "../components/page/layout/layout";
import { Deal } from "../models/deal.model";
import DealTile from "../components/molecules/dealTile/dealTile";
import styles from '@/styles/Home.module.css';
import { AddActivity } from "./../utils/recentactivity";
import { GetUserFromToken } from './../utils/users';
import { DealsService } from "@/utils/DealsService";
import { RedisCacheService } from "@/utils/RedisCacheService";

//import { getServerSideSession } from "next-auth/react"

export default function Account({ session }: any) {
    return (
        <Layout>
            {/* <div className={styles.mainContent}>
                {dealsList.map((deal: Deal) => (
                    <Link key={deal.id} href={"/products/" + deal.id}>
                        <DealTile deal={deal}></DealTile>
                    </Link>
                ))}

            </div> */}
        </Layout>
    );
}

export async function getServerSideProps({ req, res }: any) {
    const cacheService = new RedisCacheService();
    await cacheService.Connect()
    const dealsService = new DealsService(cacheService);
    const user = GetUserFromToken(req.headers.authorization);

    const ck = req.cookies.sessionId;

    if (ck != null) {
        AddActivity(ck, 'deals');
    } else {
        const sid = Math.ceil(Math.random() * 1000000).toString();
        res.setHeader("Set-Cookie", "sessionId=" + sid);
        AddActivity(sid, 'deals');
    }

    // if (user) {
        return {
            props: {
                dealsList: dealsService.GetDealList(8),
            },
        };
    // } else {
    //     return {
    //         redirect: {
    //           destination: '/',
    //           permanent: false,
    //         },
    //       }
    // }
}