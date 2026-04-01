import { Link } from 'react-router-dom'
import {
  CartIcon,
  EmptyState,
  formatCurrency,
  PanelHeader,
  QuantityControl,
  TrashIcon,
} from '../components/storefront'

function CartPage({
  cartProducts,
  cartItems,
  cartCount,
  cartTotal,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onSelectProduct,
}) {
  const cartSavings = cartProducts.reduce(
    (total, product) =>
      total + (product.originalPrice - product.price) * cartItems[product.id],
    0,
  )

  return (
    <div className="route-shell">
      <section className="side-panel page-banner">
        <div className="page-banner-copy">
          <p className="panel-eyebrow">Cart</p>
          <h1>Everything ready for your next chair order.</h1>
          <p className="page-copy">
            Adjust quantities, remove items, and review your subtotal in one
            calm, focused cart page.
          </p>
        </div>

        <div className="page-banner-actions">
          <div className="page-summary-chip">
            <CartIcon />
            <span>{cartCount} items</span>
          </div>
          <Link className="secondary-button" to="/">
            Continue shopping
          </Link>
        </div>
      </section>

      <section className="page-grid cart-page-grid">
        <section className="side-panel page-panel">
          <PanelHeader
            icon={<CartIcon />}
            iconClass="cart-panel-icon"
            eyebrow="Cart"
            title="Ready to buy"
            count={cartCount}
          />

          {cartProducts.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              copy="Add a chair from the catalog to start building your order."
              action={
                <Link className="secondary-button small" to="/">
                  Go to catalog
                </Link>
              }
            />
          ) : (
            <div className="side-list page-list">
              {cartProducts.map((product) => (
                <article key={product.id} className="side-item page-item">
                  <img src={product.image} alt={product.name} loading="lazy" />

                  <div className="side-item-copy">
                    <div className="page-item-head">
                      <div>
                        <p className="item-kicker">{product.collection}</p>
                        <h4>{product.name}</h4>
                      </div>
                      <div className="price-stack">
                        <strong>
                          {formatCurrency(product.price * cartItems[product.id])}
                        </strong>
                        <span className="item-helper">
                          {cartItems[product.id]} x {formatCurrency(product.price)}
                        </span>
                      </div>
                    </div>

                    <p className="page-note">{product.tagline}</p>

                    <div className="cart-row">
                      <QuantityControl
                        quantity={cartItems[product.id]}
                        compact
                        onDecrease={() => onDecreaseQuantity(product.id)}
                        onIncrease={() => onIncreaseQuantity(product.id)}
                      />

                      <div className="side-item-actions">
                        <Link
                          to="/"
                          className="text-button"
                          onClick={() => onSelectProduct(product.id)}
                        >
                          View chair
                        </Link>
                        <button
                          type="button"
                          className="text-button danger"
                          onClick={() => onRemoveFromCart(product.id)}
                        >
                          <TrashIcon />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="page-aside">
          <section className="side-panel page-panel order-panel">
            <PanelHeader
              icon={<CartIcon />}
              iconClass="cart-panel-icon"
              eyebrow="Order"
              title="Cart summary"
              count={cartCount}
            />

            <div className="summary-box">
              <div className="summary-line">
                <span>Subtotal</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>
              <div className="summary-line">
                <span>Delivery</span>
                <strong>Complimentary</strong>
              </div>
              <div className="summary-line">
                <span>You save</span>
                <strong>{formatCurrency(cartSavings)}</strong>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <strong>{formatCurrency(cartTotal)}</strong>
              </div>
            </div>

            <div className="page-action-stack">
              <Link className="secondary-button" to="/wishlist">
                Open wishlist page
              </Link>
              <Link className="primary-button" to="/">
                Continue shopping
              </Link>
            </div>
          </section>
        </aside>
      </section>
    </div>
  )
}

export default CartPage
