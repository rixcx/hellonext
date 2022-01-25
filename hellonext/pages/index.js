//pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import Date from "../libs/date";
import styles from '../styles/index.module.scss';

export default function Home({ blog }) {
  return (
    <div>
      <ul className={styles.list}>
        {blog.map((blog) => (
          <li key={blog.id} className={styles.item}>
            <Link href={`/blog/${blog.id}`}>
              <a>
                <p className={styles.date}><Date dateString={blog.date} /></p>
                <h1 className={styles.title}>{blog.title}</h1>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};