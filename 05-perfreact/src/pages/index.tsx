import { FormEvent, useState, useCallback } from 'react'
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();
  
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price), // É melhor formatar quando se busca os dados  
      }                                                  // do que formatar in-line no return do React
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0)

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>

        <SearchResults 
          results={results.data} 
          totalPrice={results.totalPrice}
          onAddToWishList={addToWishList}
        />
      </form>
    </div>
  )
}
