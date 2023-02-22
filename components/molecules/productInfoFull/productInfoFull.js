import styles from './productInfoFull.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductInfoFull({ product }) {
    return (
        <article className={styles.product}>
            <h1 className={styles.productName}>{product.productName}</h1>
            <section className={styles.productDetails}>
                <div className={styles.tileBanner}>
                    <div className={styles.imageBox}>
                        <Image
                            priority
                            src={"/images/" + product.imageName}
                            className={styles.productImage}
                            fill="true"
                            alt=""
                        />
                    </div>
                    <div className={styles.prices}>
                        Price:
                        <div className={styles.newPrice}>£{product.basePrice}</div>
                    </div>
                </div>

                <div className={styles.savingsBanner}>
                    {product.description}
                </div>
            </section>
        </article>
    );
}
