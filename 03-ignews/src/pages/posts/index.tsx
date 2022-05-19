import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as prismicH from '@prismicio/helpers'

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a >
                <time>{post.updatedAt}</time>

                <strong>{post.title}</strong>

                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismicClient = getPrismicClient();

  const response = await prismicClient.getAllByType('post', {
    pageSize: 100,
  });

  const posts = response.map((post) => ({
    slug: post.uid,
    title: prismicH.asText(post.data.Title),
    excerpt: post.data.Content.find((content) => content.type === 'paragraph')?.text ?? '',
    updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }));
  return {
    props: {
      posts
    },
  }
}