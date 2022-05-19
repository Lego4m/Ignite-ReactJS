import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import * as prismicH from '@prismicio/helpers'
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          >

          </div>
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session  = await getSession({ req });
  const { slug } = params;

  if (!session.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismicClient = getPrismicClient(req);

  const response = await prismicClient.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: prismicH.asText(response.data.Title),
    content: prismicH.asHTML(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    }
  }
}