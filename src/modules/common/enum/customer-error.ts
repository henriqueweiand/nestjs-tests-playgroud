export enum CustomerErrorMessages {
  ALREADY_EXISTS = 'Already exist Customer with this document',
  CUSTOMERS_NOT_EMPTY = 'Customers need to be included when all Customers is false',
  NOT_FOUND = 'Customer(s) not found',
  TOO_MANY = 'Max Panel List Size Request exceeded (50)',
  LIMIT = 'You reached actives panel limit',
  BAD_REQUEST = 'Invalid ID',
  METHOD_NOT_ALLOWED = 'It is not possible to bring this number of documents',
  CUSTOMER_PER_CARD_EXISTS = 'Customer cannot be saved because the number of the card provided is already in use in this program',
}
