import { useMemo } from 'react';
import { ProductItem } from './ProductItem';

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>
  onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results]);

  return (
    <div>
      <h2>{totalPrice}</h2>

      {results.map((product) => {
        return (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToWishList={onAddToWishList}
          />
        )
      })}
    </div>
  )
}

/**
 * Ciclo de renderização do React
 * 
 * 1. Cria uma nova versão do componente
 * 2. Compara com a versão anterior
 * 3. Se houver alterações, atualiza o que alterou
 */

/**
 * memo
 * 
 * 1. Pure Functional Components
 * 2. Renders too often
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/** 
 * useMemo / useCallback
 * 
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
*/