import { cache, useEffect, useState } from 'react';
import Layout from '../components/page/layout/layout';
import TextContent from '../components/textContent/textContent';
import DealsShower from '../components/molecules/dealsShower/dealsShower';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import { LoadJSONFromFile, GetDealList } from './../utils/dataloader';
import { DealsService } from '@/utils/DealsService';
import { RedisCacheService } from '@/utils/RedisCacheService';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const welcomeMessage = await LoadJSONFromFile('welcome.json');
  const cacheService = new RedisCacheService();
  //await cacheService.Connect();
  const dealsService = new DealsService(cacheService);

  return {
    props: {
      welcomeMessage,
      dealsList: dealsService.GetDealList(4),
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
