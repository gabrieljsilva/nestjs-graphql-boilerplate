export enum USER_STATUS {
  UNCONFIRMED = 'UNCONFIRMED', // When the user creates an account and has not yet activated
  ACTIVE = 'ACTIVE', // When the user activated their account
  INACTIVE = 'INACTIVE', // When the user had their account manually disabled
}
