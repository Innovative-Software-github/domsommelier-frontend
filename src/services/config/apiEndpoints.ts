export const ApiEndpoint = {
  filters: {
    getFiltersConfig: '/api/v1/filters',
    getFilteredProducts: '/api/v1/products/filter',
  },
  events: {
    getEvents: '/api/v1/events/filter',
    getEventById: '/api/v1/events',
  }
} as const;
