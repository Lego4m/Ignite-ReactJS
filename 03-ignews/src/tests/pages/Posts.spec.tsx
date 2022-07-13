import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [
  { slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: '10 de Abril' }
]

jest.mock('../../services/prismic');

describe(('Posts page'), () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)
  
    expect(screen.getByText('My New Post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicCLientMocked = jest.mocked(getPrismicClient);

    getPrismicCLientMocked.mockReturnValueOnce({
      getAllByType: jest.fn().mockResolvedValueOnce([
        {
          uid: 'my-new-post',
          data: {
            Title: [
              { type: 'heading', text: 'My new post' }
            ],
            Content: [
              { type: 'paragraph', text: 'Post excerpt' }
            ],
          },
          last_publication_date: '04-01-2021',
        }
      ]),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({ // Se o objeto contém, mas não precisa ser estritamente igual
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2021',
            }
          ]
        }
      })
    )
  });
});