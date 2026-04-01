import { Link } from 'react-router-dom'
import {
  CartIcon,
  EmptyState,
  formatCurrency,
  HeartIcon,
  PanelHeader,
} from '../components/storefront'

function WishlistPage({
  wishlistProducts,
  cartItems,
  onSelectProduct,
  onMoveWishlistToCart,
  onRemoveFromWishlist,
}) {
  const savedInCartCount = wishlistProducts.filter(
    (product) => cartItems[product.id],
  ).length

  return (
    <div className="route-shell">
      <section className="side-panel page-banner">
        <div className="page-banner-copy">
          <p className="panel-eyebrow">Wishlist</p>
          <h1>Saved chairs worth coming back to.</h1>
          <p className="page-copy">
            Review your shortlist, compare finishes, remove pieces you no longer
            want, or move any chair straight to cart when you are ready.
          </p>
        </div>

        <div className="page-banner-actions">
          <div className="page-summary-chip">
            <HeartIcon filled />
            <span>{wishlistProducts.length} saved</span>
          </div>
          <Link className="secondary-button" to="/">
            Continue shopping
          </Link>
        </div>
      </section>

      <section className="page-grid">
        <section className="side-panel page-panel">
          <PanelHeader
            icon={<HeartIcon filled />}
            iconClass="wishlist-panel-icon"
            eyebrow="Wishlist"
            title="All saved chairs"
            count={wishlistProducts.length}
          />

          {wishlistProducts.length === 0 ? (
            <EmptyState
              title="Your wishlist is empty"
              copy="Save the chairs you love from the catalog and they will appear here."
              action={
                <Link className="secondary-button small" to="/">
                  Go to catalog
                </Link>
              }
            />
          ) : (
            <div className="side-list page-list">
              {wishlistProducts.map((product) => (
                <article key={product.id} className="side-item page-item">
                  <img src={product.image} alt={product.name} loading="lazy" />

                  <div className="side-item-copy">
                    <div className="page-item-head">
                      <div>
                        <p className="item-kicker">{product.collection}</p>
                        <h4>{product.name}</h4>
                      </div>
                      <div className="price-stack">
                        <strong>{formatCurrency(product.price)}</strong>
                        <span className="strike-price">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      </div>
                    </div>

                    <p className="page-note">{product.tagline}</p>

                    <div className="side-item-actions">
                      <button
                        type="button"
                        className="primary-button small"
                        onClick={() => onMoveWishlistToCart(product.id)}
                      >
                        <CartIcon />
                        <span>Move to cart</span>
                      </button>
                      <Link
                        to="/"
                        className="secondary-button small"
                        onClick={() => onSelectProduct(product.id)}
                      >
                        View in catalog
                      </Link>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => onRemoveFromWishlist(product.id)}
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

        <aside className="page-aside">
          <section className="side-panel page-panel">
            <PanelHeader
              icon={<HeartIcon filled />}
              iconClass="wishlist-panel-icon"
              eyebrow="Summary"
              title="Wishlist overview"
              count={wishlistProducts.length}
            />

            <div className="summary-box">
              <div className="summary-line">
                <span>Saved chairs</span>
                <strong>{wishlistProducts.length}</strong>
              </div>
              <div className="summary-line">
                <span>Already in cart</span>
                <strong>{savedInCartCount}</strong>
              </div>
            </div>

            <div className="page-action-stack">
              <Link className="secondary-button" to="/">
                Continue shopping
              </Link>
              <Link className="primary-button" to="/cart">
                Open cart page
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  )
}

export default WishlistPage
