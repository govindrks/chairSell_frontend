import { Link } from 'react-router-dom'
import {
  CartIcon,
  EmptyState,
  HeartIcon,
  PanelHeader,
  PreviewItem,
  ProductCard,
  QuantityControl,
  SparkIcon,
  StatCard,
} from '../components/storefront'
import { formatCurrency, getDiscount } from '../utils/storefront'

function HomePage({
  products,
  selectedProduct,
  selectedQuantity,
  selectedIsWishlisted,
  featuredSavings,
  wishlistProducts,
  cartProducts,
  wishlistCount,
  cartCount,
  cartTotal,
  cartItems,
  onSelectProduct,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onToggleWishlist,
}) {
  return (
    <>
      <section className="topbar">
        <section className="intro-panel">
          <p className="eyebrow">Prince Chair</p>
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
      </section>

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
                    onDecrease={() => onDecreaseQuantity(selectedProduct.id)}
                    onIncrease={() => onIncreaseQuantity(selectedProduct.id)}
                  />
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => onAddToCart(selectedProduct.id)}
                  >
                    <CartIcon />
                    <span>Add to cart</span>
                  </button>
                )}

                <button
                  type="button"
                  className={`secondary-button${selectedIsWishlisted ? ' active' : ''}`}
                  onClick={() => onToggleWishlist(selectedProduct.id)}
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
                    isWishlisted={wishlistProducts.some(
                      (wishlistProduct) => wishlistProduct.id === product.id,
                    )}
                    quantity={quantity}
                    onSelect={() => onSelectProduct(product.id)}
                    onToggleWishlist={() => onToggleWishlist(product.id)}
                    onAddToCart={() => onAddToCart(product.id)}
                  />
                )
              })}
            </div>
          </section>
        </section>

        <aside className="side-rail">
          <section className="side-panel preview-panel">
            <PanelHeader
              icon={<HeartIcon filled />}
              iconClass="wishlist-panel-icon"
              eyebrow="Wishlist"
              title="Saved styles"
              count={wishlistCount}
            />

            {wishlistProducts.length === 0 ? (
              <EmptyState
                title="No saved chairs yet"
                copy="Tap the heart on any chair card to keep your favorites close."
                action={
                  <Link className="secondary-button small" to="/">
                    Explore catalog
                  </Link>
                }
              />
            ) : (
              <>
                <div className="side-list preview-list">
                  {wishlistProducts.slice(0, 2).map((product) => (
                    <PreviewItem
                      key={product.id}
                      product={product}
                      caption={product.collection}
                    />
                  ))}
                </div>
                <div className="preview-action-row">
                  <Link className="secondary-button small" to="/wishlist">
                    Open wishlist page
                  </Link>
                </div>
              </>
            )}
          </section>

          <section className="side-panel preview-panel">
            <PanelHeader
              icon={<CartIcon />}
              iconClass="cart-panel-icon"
              eyebrow="Cart"
              title="Order snapshot"
              count={cartCount}
            />

            {cartProducts.length === 0 ? (
              <EmptyState
                title="Your cart is empty"
                copy="Select a chair from the gallery and add it to cart to start your order."
                action={
                  <Link className="secondary-button small" to="/">
                    Browse chairs
                  </Link>
                }
              />
            ) : (
              <>
                <div className="side-list preview-list">
                  {cartProducts.slice(0, 2).map((product) => (
                    <PreviewItem
                      key={product.id}
                      product={product}
                      caption={`Qty ${cartItems[product.id]}`}
                    />
                  ))}
                </div>
                <div className="summary-box">
                  <div className="summary-line">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(cartTotal)}</strong>
                  </div>
                  <div className="summary-line">
                    <span>Items</span>
                    <strong>{cartCount}</strong>
                  </div>
                </div>
                <div className="preview-action-row">
                  <Link className="primary-button small" to="/cart">
                    Open cart page
                  </Link>
                </div>
              </>
            )}
          </section>
        </aside>
      </main>
    </>
  )
}

export default HomePage
