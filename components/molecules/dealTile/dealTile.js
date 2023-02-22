import styles from './dealTile.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function DealTile({ deal }) {
    return (
        <article className={styles.deal}>
            <div className={styles.tileBanner}>
                <Image
                    priority
                    src={"/images/" + deal.imageName}
                    className={styles.productImage}
                    fill="true"
                    alt=""
                />
            </div>
            <span className={styles.saleFlash}>Sale</span>
            <h1 className={styles.productName}>{deal.productName}</h1>
            <div className={styles.savingsBanner}>
                <div className={styles.discountFlash}>-{deal.saleDiscount}%</div>
                <div className={styles.prices}>
                    <div className={styles.oldPrice}>£{deal.basePrice}</div>
                    <div className={styles.newPrice}>£{deal.salePrice}</div>
                </div>
            </div>
        </article>
    );
}
