import Head from 'next/head';

import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

/*
  여기서 허용된 파라미터만 받을 수 있다.
  paths = [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ];
  id가 pre-rendering, ssg-ssr인 파라미터만 받을 수 있다.
  ex) localhost:3000/posts/pre-rendering  (O)
  ex) localhost:3000/posts/pre-rendering2 (X)
*/
export async function getStaticPaths() {
  console.log('===== getStaticPaths =====');
  const paths = getAllPostIds();
  console.log('paths > ', paths);
  return {
    paths,
    fallback: false
  }
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
  // Fetch necessary data for the blog post using params.id
}