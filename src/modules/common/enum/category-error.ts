export enum CategoryErrorMessages {
  ALREADY_EXISTS = 'Already exist ProductCategory with this Code',
  CATEGORY_NOT_EMPTY = 'ProductCategory need to be included when all Category is false',
  NOT_FOUND = 'Category(s) not found',
  TOO_MANY = 'Max Panel List Size Request exceeded (50)',
  LIMIT = 'You reached actives panel limit',
  BAD_REQUEST = 'Invalid ID',
  METHOD_NOT_ALLOWED = 'It is not possible to bring this number of documents',
  STORE_ALREADY_HAS_DEFAULT_CATEGORIES = 'Store already has default categories',
  STORE_NOT_FOUND = ' Store not found',
  CATEGORY_STATUS_NOT_ALLOWED_TO_CHANGE = ' You cannot change status of a default category',
  UPDATE_ERROR = 'There was an error while updating category',
  UPDATE_STATUS_ERROR = 'There was an error while updating category status',
}
