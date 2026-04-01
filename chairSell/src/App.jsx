import './App.css'
import { useDispatch, useSelector } from 'react-redux'
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

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function formatCurrency(value) {
  return currencyFormatter.format(value)
}

function getDiscount(product) {
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  )
}

function CartIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5h2l2.3 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7.4" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.4 4.9 13.8a4.7 4.7 0 0 1 6.6-6.7L12 7.6l.5-.5a4.7 4.7 0 0 1 6.6 6.7L12 20.4Z" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg
      className="icon-inline"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="m19 14 .8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8.8-1.9Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7 7 20h10l1-13" />
      <path d="M9 7V4h6v3" />
    </svg>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function QuantityControl({ quantity, onDecrease, onIncrease, compact = false }) {
  return (
    <div className={`quantity-control${compact ? ' compact' : ''}`}>
      <button
        type="button"
        className="quantity-button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span className="quantity-value">{quantity}</span>
      <button
        type="button"
        className="quantity-button"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  )
}

function EmptyState({ title, copy }) {
  return (
    <div className="empty-state">
      <h4>{title}</h4>
      <p>{copy}</p>
    </div>
  )
}

function ProductCard({
  product,
  isSelected,
  isWishlisted,
  quantity,
  onSelect,
  onToggleWishlist,
  onAddToCart,
}) {
  return (
    <article className={`chair-card${isSelected ? ' is-selected' : ''}`}>
      <button
        type="button"
        className={`wishlist-button${isWishlisted ? ' active' : ''}`}
        onClick={onToggleWishlist}
        aria-label={
          isWishlisted ? 'Remove from wishlist' : 'Add chair to wishlist'
        }
        aria-pressed={isWishlisted}
      >
        <HeartIcon filled={isWishlisted} />
      </button>

      <button type="button" className="card-media" onClick={onSelect}>
        <span className="card-discount">{getDiscount(product)}% off</span>
        <div className="card-image-frame">
          <img
            src={product.image}
            alt={product.name}
            className="card-image"
            loading="lazy"
          />
        </div>
      </button>

      <div className="card-body">
        <div className="card-meta">
          <span className="collection-badge">{product.collection}</span>
          <span className={`cart-badge${quantity > 0 ? ' emphasis' : ''}`}>
            {quantity > 0 ? `In cart x${quantity}` : 'Ready to style'}
          </span>
        </div>

        <h3>{product.name}</h3>
        <p className="card-copy">{product.tagline}</p>

        <div className="card-price-row">
          <strong>{formatCurrency(product.price)}</strong>
          <span>{formatCurrency(product.originalPrice)}</span>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className={`secondary-button small${isSelected ? ' active' : ''}`}
            onClick={onSelect}
          >
            {isSelected ? 'Selected' : 'Select chair'}
          </button>

          <button
            type="button"
            className="primary-button small"
            onClick={onAddToCart}
          >
            <CartIcon />
            <span>{quantity > 0 ? 'Add one more' : 'Add to cart'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}

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

  const selectedQuantity = cartItems[selectedProduct.id] ?? 0
  const selectedIsWishlisted = wishlistIds.includes(selectedProduct.id)
  const featuredSavings = selectedProduct.originalPrice - selectedProduct.price
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

  return (
    <div className="page-shell">
      <header className="topbar">
        <section className="intro-panel">
          <p className="eyebrow">Chair Atelier</p>
          <h1>Simple, classy seating for every focused corner.</h1>
          <p className="intro-copy">
            A refined chair storefront built around your reference images, with
            smooth chair selection, wishlist controls, add-to-cart actions, and
            quantity updates powered by Redux Toolkit.
          </p>
          <div className="intro-note">
            <SparkIcon />
            <span>Select a chair, save it, move it to cart, or adjust quantity.</span>
          </div>
        </section>

        <section className="stat-panel">
          <StatCard label="Curated chairs" value={products.length} />
          <StatCard label="Wishlist" value={wishlistCount} />
          <StatCard label="Cart items" value={cartCount} />
          <StatCard label="Cart total" value={formatCurrency(cartTotal)} />
        </section>
      </header>

      <main className="content-grid">
        <section className="main-stage">
          <section className="feature-card">
            <div className="feature-media">
              <span className="selected-chip">Selected chair</span>
              <span className="discount-chip">
                {getDiscount(selectedProduct)}% off
              </span>
              <div className="feature-image-wrap">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="feature-image"
                />
              </div>
            </div>

            <div className="feature-copy">
              <div>
                <p className="feature-eyebrow">{selectedProduct.collection}</p>
                <h2>{selectedProduct.name}</h2>
              </div>

              <p className="feature-tagline">{selectedProduct.tagline}</p>
              <p className="feature-description">{selectedProduct.description}</p>

              <div className="detail-row">
                <span className="detail-pill">{selectedProduct.finish}</span>
                <span className="detail-pill">{selectedProduct.material}</span>
                <span className="detail-pill">{selectedProduct.useCase}</span>
              </div>

              <div className="price-row">
                <span className="current-price">
                  {formatCurrency(selectedProduct.price)}
                </span>
                <span className="original-price">
                  {formatCurrency(selectedProduct.originalPrice)}
                </span>
                <span className="savings-pill">
                  Save {formatCurrency(featuredSavings)}
                </span>
              </div>

              <div className="feature-actions">
                {selectedQuantity > 0 ? (
                  <QuantityControl
                    quantity={selectedQuantity}
                    onDecrease={() =>
                      dispatch(decreaseQuantity(selectedProduct.id))
                    }
                    onIncrease={() =>
                      dispatch(increaseQuantity(selectedProduct.id))
                    }
                  />
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => dispatch(addToCart(selectedProduct.id))}
                  >
                    <CartIcon />
                    <span>Add to cart</span>
                  </button>
                )}

                <button
                  type="button"
                  className={`secondary-button${selectedIsWishlisted ? ' active' : ''}`}
                  onClick={() => dispatch(toggleWishlist(selectedProduct.id))}
                  aria-pressed={selectedIsWishlisted}
                >
                  <HeartIcon filled={selectedIsWishlisted} />
                  <span>
                    {selectedIsWishlisted ? 'Wishlisted' : 'Add to wishlist'}
                  </span>
                </button>
              </div>

              <ul className="feature-list">
                {selectedProduct.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="catalog-panel">
            <div className="section-head">
              <div>
                <p className="panel-eyebrow">Catalog</p>
                <h3>Choose your chair</h3>
              </div>
              <p>
                Browse the full collection, select any chair for a closer look,
                save favorites to wishlist, or add multiple pieces directly to
                cart.
              </p>
            </div>

            <div className="product-grid">
              {products.map((product) => {
                const quantity = cartItems[product.id] ?? 0

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={product.id === selectedProduct.id}
                    isWishlisted={wishlistIds.includes(product.id)}
                    quantity={quantity}
                    onSelect={() => dispatch(selectProduct(product.id))}
                    onToggleWishlist={() => dispatch(toggleWishlist(product.id))}
                    onAddToCart={() => dispatch(addToCart(product.id))}
                  />
                )
              })}
            </div>
          </section>
        </section>

        <aside className="side-rail">
          <section className="side-panel">
            <div className="panel-head">
              <div className="panel-title">
                <span className="panel-icon wishlist-panel-icon" aria-hidden="true">
                  <HeartIcon filled />
                </span>
                <div>
                <p className="panel-eyebrow">Wishlist</p>
                <h3>Saved for later</h3>
                </div>
              </div>
              <span className="count-pill">{wishlistCount}</span>
            </div>

            {wishlistProducts.length === 0 ? (
              <EmptyState
                title="No saved chairs yet"
                copy="Tap the heart on any chair card to keep your favorites close."
              />
            ) : (
              <div className="side-list">
                {wishlistProducts.map((product) => (
                  <article key={product.id} className="side-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <div className="side-item-copy">
                      <h4>{product.name}</h4>
                      <p>{product.collection}</p>
                      <strong>{formatCurrency(product.price)}</strong>

                      <div className="side-item-actions">
                        <button
                          type="button"
                          className="secondary-button small"
                          onClick={() => dispatch(moveWishlistToCart(product.id))}
                        >
                          <CartIcon />
                          <span>Move to cart</span>
                        </button>
                        <button
                          type="button"
                          className="text-button"
                          onClick={() => dispatch(removeFromWishlist(product.id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="side-panel">
            <div className="panel-head">
              <div className="panel-title">
                <span className="panel-icon cart-panel-icon" aria-hidden="true">
                  <CartIcon />
                </span>
                <div>
                <p className="panel-eyebrow">Cart</p>
                <h3>Ready to buy</h3>
                </div>
              </div>
              <span className="count-pill">{cartCount}</span>
            </div>

            {cartProducts.length === 0 ? (
              <EmptyState
                title="Your cart is empty"
                copy="Select a chair from the gallery and add it to cart to start your order."
              />
            ) : (
              <>
                <div className="side-list">
                  {cartProducts.map((product) => (
                    <article key={product.id} className="side-item">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />

                      <div className="side-item-copy">
                        <h4>{product.name}</h4>
                        <p>{product.collection}</p>
                        <strong>{formatCurrency(product.price)}</strong>

                        <div className="cart-row">
                          <QuantityControl
                            quantity={cartItems[product.id]}
                            compact
                            onDecrease={() =>
                              dispatch(decreaseQuantity(product.id))
                            }
                            onIncrease={() =>
                              dispatch(increaseQuantity(product.id))
                            }
                          />

                          <button
                            type="button"
                            className="text-button danger"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            <TrashIcon />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="summary-box">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(cartTotal)}</strong>
                  </div>
                  <div className="summary-line">
                    <span>Delivery</span>
                    <strong>Complimentary</strong>
                  </div>
                  <div className="summary-line total">
                    <span>Total</span>
                    <strong>{formatCurrency(cartTotal)}</strong>
                  </div>
                </div>
              </>
            )}
          </section>
        </aside>
      </main>
    </div>
  )
}

export default App
