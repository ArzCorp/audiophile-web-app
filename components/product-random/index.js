import { useEffect, useState } from 'react'
import { URL_API, URL_IMAGE } from 'services/path'
import { useRouter } from 'next/dist/client/router'

import Button from 'components/button'

export default function ProductRandom() {
  const router = useRouter()
  const [products, setProducts] = useState([])

  const getData = async () => {
    const response = await fetch(URL_API + '/all')
    const data = await response.json()
    setProducts(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className="flex">
      {products.map((product, key) => {
        if ((key + 1) % 2 === 0) {
          // HACER ALEATORIO QUE PRODUCTOS SE MUESTRAN AQUI
          return (
            <div className="flex flex-col items-center">
              <img
                className="w-11/12"
                src={URL_IMAGE + product.image.desktop}
                alt={product.name}
              />
              <h2 className="font-bold text-lg leading-2xl mb-8 mt-10">
                {product.name}
              </h2>
              <Button
                name="See Product"
                solid={true}
                onClick={() => router.push(`/product/${product.slug}`)}
              />
            </div>
          )
        }
        return null
      })}
    </section>
  )
}