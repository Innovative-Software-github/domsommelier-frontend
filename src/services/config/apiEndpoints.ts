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
  }
} as const;
