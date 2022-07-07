import { memo } from 'react';

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
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishList(product.id)}>Add to wishlist</button>
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent, 
  (prevProps, nextProps) => { // Se for true, o componente não renderiza de novo.
    return Object.is(prevProps.product, nextProps.product);
  }
);
