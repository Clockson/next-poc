import styles from './textContent.module.css';

export default function TextContent({ welcomeMessage }) {
    return (
        <article className={styles.textContent}>
          <h1>{welcomeMessage?.title}</h1>
          <div className={styles.content}>
            {welcomeMessage?.content}
          </div>
        </article>
    );
  }
