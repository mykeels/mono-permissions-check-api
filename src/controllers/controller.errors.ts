import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';

export class ControllerError extends Error {
  code: number;
  error_code: number;
  constructor(message: string, code?: number, error_code?: number) {
    super(message);
    this.code = code || 400;
    error_code = error_code || 0;
  }
}

export class ActionNotAllowedError extends ControllerError {
  constructor(message: string) {
    super(message);
    this.code = BAD_REQUEST;
  }
}

export class NotFoundError extends ControllerError {
  constructor(message: string) {
    super(message);
    this.code = NOT_FOUND;
  }
}

/**
 * Throws an error when the subscription owner has sent the member an invite already
 */
export class InviteExistsError extends ControllerError {
  constructor() {
    super('you have sent an invite to this user already');
    this.code = NOT_FOUND;
    this.error_code = 101;
  }
}

/**
 * Throws an error when the invited member belongs to another family subscription plan
 */
export class AnotherFamilyError extends ControllerError {
  constructor() {
    super('this user belongs to another family');
    this.code = BAD_REQUEST;
    this.error_code = 102;
  }
}

/**
 * Throws an error when the subscription owner tries to invite themselves to a family subscription plan
 */
export class SelfInviteError extends ControllerError {
  constructor() {
    super('you cannot send an invite to yourself');
    this.code = BAD_REQUEST;
    this.error_code = 103;
  }
}

export class InvalidTokenTypeError extends ControllerError {
  constructor(tokenType: string) {
    super(`Invalid Token Type, Token type should be ${tokenType}`);
    this.code = BAD_REQUEST;
    this.error_code = 104;
  }
}
