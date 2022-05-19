import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import * as prismicH from '@prismicio/helpers'

import { getPrismicClient } from '../../../services/prismic';

import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          >
          </div>

          <div className={styles.continueReading}>
            Wanna continue reading?

            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // Gera páginas parametrizadas de forma estática na build
    fallback: 'blocking', // true (client), false (404), 'blocking' (SSR -> SSG)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismicClient = getPrismicClient();

  const response = await prismicClient.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: prismicH.asText(response.data.Title),
    content: prismicH.asHTML(response.data.Content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  }
}