import ProductCart from '@components/ProductCart'
import Button from '@components/Button'
import { useShoppingCart } from '@hooks/useShoppingCart'
import { Fragment } from 'react'
import { USDFormat } from 'utils/currencyUtils'

export default function Cart({ isOpen }) {
  const {
    products,
    error,
    totalCost,
    removeAllProductsToShoppingCart,
    addProductToShoppingCart,
    removeProductToShoppingCart,
  } = useShoppingCart(isOpen)
  const hasProductsInCart = products.length > 0
  const showHasProductsInCart = hasProductsInCart ? '' : 'hidden'
  const marginHasProductsInCart = hasProductsInCart ? 'mb-8' : ''

  return (
    <div className="p-8 bg-white w-[378px] absolute top-[129px] right-[165px] rounded-lg">
      <div
        className={`${marginHasProductsInCart} flex items-center justify-between text-black`}
      >
        <p
          className={`${showHasProductsInCart} text-lg font-bold`}
        >{`CART ( ${products.length} )`}</p>
        <p
          className={`${showHasProductsInCart} text-orange-own text-sm cursor-pointer hover:underline`}
          onClick={removeAllProductsToShoppingCart}
        >
          Remove all
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {error && !hasProductsInCart ? (
          <p className="text-center">{error}</p>
        ) : (
          products.map((product) => (
            <ProductCart
              key={product.id}
              {...product}
              handleAddProduct={addProductToShoppingCart}
              handleRemoveProduct={removeProductToShoppingCart}
            />
          ))
        )}
      </div>
      {hasProductsInCart ? (
        <Fragment>
          <div className="flex items-center justify-between my-8">
            <p className="text-sm text-opacity-50">TOTAL</p>
            <p className="font-bold text-lg">{USDFormat(totalCost)}</p>
          </div>
          <Button solid href="/checkout" full disabled={!hasProductsInCart}>
            Checkout
          </Button>
        </Fragment>
      ) : null}
    </div>
  )
}
