import { client } from "../../libs/client";
import Date from "../../libs/date";
import cheerio from 'cheerio';
import hljs from 'highlight.js';

import styles from '../../styles/detail.module.scss';
import 'highlight.js/styles/Monokai-Sublime.css';

export default function blogId({ blog, highlightedBody }) {
  return (
    <div>
        <div className={styles.header}>
          <p className={styles.date}><Date dateString={blog.date} /></p>
          <h1 className={styles.title}>{blog.title}</h1>
        </div>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{
          __html: highlightedBody,
        }}
      />
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  const $ = cheerio.load(data.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return {
    props: {
      blog: data,
      highlightedBody: $.html(),
    },
  };
};