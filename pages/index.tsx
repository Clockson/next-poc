import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import Layout from '../components/page/layout/layout';
import TextContent from '../components/textContent/textContent';
import DealsShower from '../components/molecules/dealsShower/dealsShower';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { LoadJSONFromFile, GetDealList } from './../utils/dataloader';

const inter = Inter({ subsets: ['latin'] })

export function getStaticProps() {
  const welcomeMessage = LoadJSONFromFile('welcome.json');
  const dealsList = GetDealList(4);

  return {
    props: {
      welcomeMessage,
      dealsList,
    },
  };
}

export default function Home({ welcomeMessage, dealsList }: any) {
  const [deals, setDeals] = useState(dealsList);
  const [dirtyDeals, setDirtyDeals] = useState(true)

  useEffect(() => {
    if (dirtyDeals) {
      fetch("/api/getDeals")
        .then((result) => result.json())
        .then((data) => {
          setDirtyDeals(false);
          setDeals(data.deals);
        });
    }

    //setDeals(result);
  });

  return (
    <Layout>
      <div className={styles.mainContent}>
        <TextContent welcomeMessage={welcomeMessage}></TextContent>
        <DealsShower dealsList={deals}></DealsShower>
      </div>
    </Layout>
  )
}
