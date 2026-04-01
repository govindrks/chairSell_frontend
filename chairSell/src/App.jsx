import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Masthead } from './components/storefront'
import HomePage from './pages/HomePage'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  moveWishlistToCart,
  removeFromCart,
  removeFromWishlist,
  selectProduct,
  toggleWishlist,
} from './store/shopSlice'

function App() {
  const dispatch = useDispatch()
  const { products, selectedProductId, wishlistIds, cartItems } = useSelector(
    (state) => state.shop,
  )

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0]

  if (!selectedProduct) {
    return null
  }

  const wishlistProducts = products.filter((product) =>
    wishlistIds.includes(product.id),
  )
  const cartProducts = products.filter((product) => cartItems[product.id])
  const wishlistCount = wishlistProducts.length
  const cartCount = cartProducts.reduce(
    (count, product) => count + cartItems[product.id],
    0,
  )
  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price * cartItems[product.id],
    0,
  )
  const selectedQuantity = cartItems[selectedProduct.id] ?? 0
  const selectedIsWishlisted = wishlistIds.includes(selectedProduct.id)
  const featuredSavings = selectedProduct.originalPrice - selectedProduct.price

  const handleSelectProduct = (productId) => dispatch(selectProduct(productId))
  const handleToggleWishlist = (productId) => dispatch(toggleWishlist(productId))
  const handleAddToCart = (productId) => dispatch(addToCart(productId))
  const handleIncreaseQuantity = (productId) =>
    dispatch(increaseQuantity(productId))
  const handleDecreaseQuantity = (productId) =>
    dispatch(decreaseQuantity(productId))
  const handleMoveWishlistToCart = (productId) =>
    dispatch(moveWishlistToCart(productId))
  const handleRemoveFromWishlist = (productId) =>
    dispatch(removeFromWishlist(productId))
  const handleRemoveFromCart = (productId) =>
    dispatch(removeFromCart(productId))

  return (
    <div className="page-shell">
      <Masthead wishlistCount={wishlistCount} cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              selectedProduct={selectedProduct}
              selectedQuantity={selectedQuantity}
              selectedIsWishlisted={selectedIsWishlisted}
              featuredSavings={featuredSavings}
              wishlistProducts={wishlistProducts}
              cartProducts={cartProducts}
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              cartTotal={cartTotal}
              cartItems={cartItems}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onToggleWishlist={handleToggleWishlist}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlistProducts={wishlistProducts}
              cartItems={cartItems}
              onSelectProduct={handleSelectProduct}
              onMoveWishlistToCart={handleMoveWishlistToCart}
              onRemoveFromWishlist={handleRemoveFromWishlist}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartProducts={cartProducts}
              cartItems={cartItems}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onSelectProduct={handleSelectProduct}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
