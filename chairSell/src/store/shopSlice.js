import { createSlice } from '@reduxjs/toolkit'
import { chairProducts } from '../data/chairs'

function addCartUnit(cartItems, chairId) {
  cartItems[chairId] = (cartItems[chairId] ?? 0) + 1
}

const initialState = {
  products: chairProducts,
  selectedProductId: chairProducts[0]?.id ?? null,
  wishlistIds: [],
  cartItems: {},
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    selectProduct(state, action) {
      state.selectedProductId = action.payload
    },
    toggleWishlist(state, action) {
      const chairId = action.payload
      const chairIndex = state.wishlistIds.indexOf(chairId)

      if (chairIndex >= 0) {
        state.wishlistIds.splice(chairIndex, 1)
        return
      }

      state.wishlistIds.push(chairId)
    },
    removeFromWishlist(state, action) {
      state.wishlistIds = state.wishlistIds.filter(
        (chairId) => chairId !== action.payload,
      )
    },
    addToCart(state, action) {
      addCartUnit(state.cartItems, action.payload)
    },
    increaseQuantity(state, action) {
      addCartUnit(state.cartItems, action.payload)
    },
    decreaseQuantity(state, action) {
      const chairId = action.payload

      if (!state.cartItems[chairId]) {
        return
      }

      if (state.cartItems[chairId] === 1) {
        delete state.cartItems[chairId]
        return
      }

      state.cartItems[chairId] -= 1
    },
    removeFromCart(state, action) {
      delete state.cartItems[action.payload]
    },
    moveWishlistToCart(state, action) {
      const chairId = action.payload
      state.wishlistIds = state.wishlistIds.filter((id) => id !== chairId)
      state.selectedProductId = chairId
      addCartUnit(state.cartItems, chairId)
    },
  },
})

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  moveWishlistToCart,
  removeFromCart,
  removeFromWishlist,
  selectProduct,
  toggleWishlist,
} = shopSlice.actions

export default shopSlice.reducer
