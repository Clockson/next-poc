import styles from './dealsShower.module.css';
import Link from 'next/link';
import DealTile from '../dealTile/dealTile';

export default function DealsShower({ dealsList }) {
    return (
        <article className={styles.dealShower}>
            <h1>Todays Deals</h1>
            <div className={styles.dealBox}>
                {dealsList.map((deal) => (
                    <Link key={deal.id} href={"/products/" + deal.id}>
                    <DealTile deal={deal}></DealTile>
                    </Link>
                ))}
            </div>
            <Link href="/deals">Go to deals ...</Link>
        </article>
    );
}
