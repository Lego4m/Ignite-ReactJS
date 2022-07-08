import { memo, useState } from 'react';
import dynamic from 'next/dynamic';

import { AddProductToWishListProps } from './AddProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then((mod) => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishList: (id: number) => void;
}

// shallow compare -> comparação rasa

// {} === {} // false
// igualdade referencial

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      { isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)} 
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      ) }
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent, 
  (prevProps, nextProps) => { // Se for true, o componente não renderiza de novo.
    return Object.is(prevProps.product, nextProps.product);
  }
);
