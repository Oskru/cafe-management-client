import { Product } from '../../../interfaces/product';
import { Container } from '../../../utils/components/container/container';
import './product-card.scss';

export function ProductCard(product: Product) {
  return (
    <Container
      display='flex'
      flexDirection='column'
      flexWrap='nowrap'
      className='product-card'
    >
      <h4 className='product-card__title'>Product title: {product.name}</h4>
      <img
        src={product.imageUrl}
        alt='Product name'
        className='product-card__image'
      />
      <p className='product-card__quantity'>
        Product quantity: {product.quantity}
      </p>
      <p className='product-card__price'>Product price: {product.price}</p>
      <p className='product-card__description'>
        Product description: {product.description}
      </p>
      <p className='product-card__category'>
        Product category: {product.category}
      </p>
    </Container>
  );
}
