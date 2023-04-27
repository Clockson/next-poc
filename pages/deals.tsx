import Link from "next/link";
import Layout from "../components/page/layout/layout";
import { Deal } from "../models/deal.model";
import DealTile from "../components/molecules/dealTile/dealTile";
import styles from '@/styles/deals.module.css';
import { AddActivity } from "./../utils/recentactivity";
import { GetUserFromToken } from './../utils/users';
import { DealsService } from "@/utils/DealsService";
import { RedisCacheService } from "@/utils/RedisCacheService";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const i18n = require('../next-i18next.config');

//import { getServerSideSession } from "next-auth/react"

export default function Deals({ dealsList }: any) {
    const { t } = useTranslation();
    return (
        <Layout>
            <section className={styles.mainContent}>
                <h1 className={styles.title}>{ t("greeting") }</h1>
                <div className={styles.deals}>
                    {dealsList.map((deal: Deal) => (
                        <Link key={deal.id} href={"/products/" + deal.id}>
                            <DealTile deal={deal}></DealTile>
                        </Link>
                    ))}

                </div>
                <nav>
                    <Link href={"/deals"} locale="en" className={styles.buttonise}>{ t("lng.en") }</Link>
                    <Link href={"/deals"} locale="fr" className={styles.buttonise}>{ t("lng.fr") }</Link>
                </nav>
            </section>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, locale }: any) {
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
                ...await serverSideTranslations(locale, ['common'], i18n)
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