export const ApiEndpoint = {
  filters: {
    getFiltersConfig: '/api/v1/filters',
  },

  products: {
    getProductById: '/api/v1/products',
    getFilteredProducts: '/api/v1/products/filter',
    search: '/api/v1/products/search',
  },

  events: {
    getEvents: '/api/v1/events/filter',
    getEventById: '/api/v1/events',
  },

  news: {
    getNews: '/api/v1/news',
  },

  auth: {
    initiate: '/api/v1/auth/initiate',
    confirm: '/api/v1/auth/confirm',
  },

  customer: {
    getProfile: '/customer/profile',
    updateProfile: '/customer/profile',
  },

  basket: {
    getBasket: (customerId: string) => `/api/v1/basket/${customerId}`,
    storeAvailability: (customerId: string) =>
      `/api/v1/basket/${customerId}/availability`,
    // TODO: Засинхрониться с беком и перенести в body кверю
    addToBasket: (customerId: string, productId: string, quantity: number) =>
      `/api/v1/basket/${customerId}/add/${productId}?quantity=${quantity}`,
    removeFromBasket: (customerId: string, productId: string) =>
      `/api/v1/basket/${customerId}/remove/${productId}`,
    clearBasket: (customerId: string) => `/api/v1/basket/${customerId}/clear`,
  },

  saved: {
    getSaved: (customerId: string) => `/api/v1/saved/${customerId}`,
    addToSaved: (customerId: string, productId: string) =>
      `/api/v1/saved/${customerId}/add/${productId}`,
    removeFromSaved: (customerId: string, productId: string) =>
      `/api/v1/saved/${customerId}/remove/${productId}`,
    clearSaved: (customerId: string) => `/api/v1/saved/${customerId}/clear`,
  },

  wineStores: {
    getAll: (page = 0, size = 50) => `/api/v1/wine-stores?page=${page}&size=${size}`,
    getById: (id: number) => `/api/v1/wine-stores/${id}`,
  },

  orders: {
    checkout: (customerId: string, wineStoreId: number) =>
      `/api/v1/basket/${customerId}/checkout/${wineStoreId}`,
    list: (page = 0, size = 10) => `/api/v1/orders?page=${page}&size=${size}`,
    getById: (id: string) => `/api/v1/orders/${id}`,
    cancel: (id: string) => `/api/v1/orders/${id}/cancel`,
  },

  eventOrders: {
    create: '/api/v1/event-orders',
  },
} as const;
