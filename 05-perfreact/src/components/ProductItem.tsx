import { memo } from 'react';

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

// shallow compare -> comparação rasa

// {} === {} // false
// igualdade referencial

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent, 
  (prevProps, nextProps) => { // Se for true, o componente não renderiza de novo.
    return Object.is(prevProps.product, nextProps.product);
  }
);
