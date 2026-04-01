import { Link, NavLink } from 'react-router-dom'
import { formatCurrency, getDiscount } from '../utils/storefront'

export function LogoIcon() {
  return (
    <svg
      className="logo-icon"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="14" y="8" width="20" height="14" rx="5" />
      <path d="M18 22v8a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6v-8" />
      <path d="M17 28h14" />
      <path d="M19 36v4" />
      <path d="M29 36v4" />
      <path d="M12 17h2" />
      <path d="M34 17h2" />
    </svg>
  )
}

export function CartIcon() {
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

export function HeartIcon({ filled = false }) {
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

export function SparkIcon() {
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

export function PlusIcon() {
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

export function MinusIcon() {
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

export function TrashIcon() {
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

export function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export function PanelHeader({ icon, iconClass, eyebrow, title, count }) {
  return (
    <div className="panel-head">
      <div className="panel-title">
        <span className={`panel-icon ${iconClass}`} aria-hidden="true">
          {icon}
        </span>
        <div>
          <p className="panel-eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
        </div>
      </div>
      <span className="count-pill">{count}</span>
    </div>
  )
}

export function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  compact = false,
}) {
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

export function EmptyState({ title, copy, action = null }) {
  return (
    <div className="empty-state">
      <h4>{title}</h4>
      <p>{copy}</p>
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  )
}

export function Masthead({ wishlistCount, cartCount }) {
  return (
    <header className="masthead">
      <Link to="/" className="brand-lockup brand-link" aria-label="Go to home page">
        <span className="brand-mark" aria-hidden="true">
          <LogoIcon />
        </span>
        <div className="brand-copy">
          <span className="brand-name">Chair Atelier</span>
          <span className="brand-tag">Simple living, refined seating</span>
        </div>
      </Link>

      <nav className="top-actions" aria-label="Store pages">
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `top-action top-action-heart${isActive ? ' active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <span className="top-action-icon">
                <HeartIcon filled={wishlistCount > 0 || isActive} />
              </span>
              <span className="top-action-copy">
                <span>Wishlist</span>
                <strong>{wishlistCount}</strong>
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `top-action top-action-cart${isActive ? ' active' : ''}`
          }
        >
          <span className="top-action-icon">
            <CartIcon />
          </span>
          <span className="top-action-copy">
            <span>Cart</span>
            <strong>{cartCount}</strong>
          </span>
        </NavLink>
      </nav>
    </header>
  )
}

export function ProductCard({
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

export function PreviewItem({ product, caption }) {
  return (
    <article className="side-item preview-item">
      <img src={product.image} alt={product.name} loading="lazy" />

      <div className="side-item-copy">
        <h4>{product.name}</h4>
        <p>{caption}</p>
        <strong>{formatCurrency(product.price)}</strong>
      </div>
    </article>
  )
}
