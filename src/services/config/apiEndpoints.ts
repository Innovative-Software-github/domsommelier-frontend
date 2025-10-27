export const ApiEndpoint = {
  filters: {
    getFiltersConfig: '/api/v1/filters',
  },

  products: {
    getProductById: '/api/v1/products',
    getFilteredProducts: '/api/v1/products/filter',
  },

  events: {
    getEvents: '/api/v1/events/filter',
    getEventById: '/api/v1/events',
  },

  basket: {
    getBasket: (customerId: string) => `/api/v1/basket/${customerId}`,
    // TODO: Засинхрониться с беком и перенести в body кверю
    addToBasket: (customerId: string, productId: string, quantity: number) =>
      `/api/v1/basket/${customerId}/add/${productId}?quantity=${quantity}`,
    removeFromBasket: (customerId: string, productId: string) => 
      `/api/v1/basket/${customerId}/remove/${productId}`,
    clearBasket: (customerId: string) => `/api/v1/basket/${customerId}/clear`,
  }
} as const;
