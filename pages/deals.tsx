import { GetDealList, LoadJSONFromFile } from "./../utils/dataloader";
import Link from "next/link";
import Layout from "../components/page/layout/layout";
import { Deal } from "../models/deal.model";
import DealTile from "../components/molecules/dealTile/dealTile";
import styles from '@/styles/Home.module.css';
import { AddActivity } from "./../utils/recentactivity";
import { GetUserFromToken } from './../utils/users';

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

export async function getServerSideProps({ req, res }: any) {
    const dealsList = GetDealList(8);
    const user = GetUserFromToken(req.headers.authorization);

    const ck = req.cookies.sessionId;

    if (ck != null) {
        AddActivity(ck, 'deals');
    } else {
        const sid = Math.ceil(Math.random() * 1000000).toString();
        res.setHeader("Set-Cookie", "sessionId=" + sid);
        AddActivity(sid, 'deals');
    }

    if (user) {
        return {
            props: {
                dealsList,
            },
        };
    } else {
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          }
    }
}