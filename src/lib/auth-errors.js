var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(statusCode, message, code) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.message = message;
        _this.code = code;
        _this.name = 'AuthError';
        return _this;
    }
    return AuthError;
}(Error));
export { AuthError };
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, fields) {
        var _this = _super.call(this, 400, message, 'VALIDATION_ERROR') || this;
        _this.fields = fields;
        _this.name = 'ValidationError';
        return _this;
    }
    return ValidationError;
}(AuthError));
export { ValidationError };
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        if (message === void 0) { message = 'Unauthorized'; }
        var _this = _super.call(this, 401, message, 'UNAUTHORIZED') || this;
        _this.name = 'UnauthorizedError';
        return _this;
    }
    return UnauthorizedError;
}(AuthError));
export { UnauthorizedError };
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message) {
        if (message === void 0) { message = 'Forbidden'; }
        var _this = _super.call(this, 403, message, 'FORBIDDEN') || this;
        _this.name = 'ForbiddenError';
        return _this;
    }
    return ForbiddenError;
}(AuthError));
export { ForbiddenError };
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(resource) {
        var _this = _super.call(this, 404, "".concat(resource, " not found"), 'NOT_FOUND') || this;
        _this.name = 'NotFoundError';
        return _this;
    }
    return NotFoundError;
}(AuthError));
export { NotFoundError };
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(message) {
        var _this = _super.call(this, 409, message, 'CONFLICT') || this;
        _this.name = 'ConflictError';
        return _this;
    }
    return ConflictError;
}(AuthError));
export { ConflictError };
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(message) {
        if (message === void 0) { message = 'Database error'; }
        var _this = _super.call(this, 500, message, 'DATABASE_ERROR') || this;
        _this.name = 'DatabaseError';
        return _this;
    }
    return DatabaseError;
}(AuthError));
export { DatabaseError };
export var errorMessages = {
    INVALID_CREDENTIALS: 'Invalid credentials provided',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Invalid password',
    INVALID_PHONE: 'Invalid phone number',
    PHONE_ALREADY_EXISTS: 'Phone number already registered',
    USERNAME_ALREADY_EXISTS: 'Username already taken',
    INVALID_DOB: 'Invalid date of birth',
    INVALID_TOKEN: 'Invalid or expired token',
    TOKEN_EXPIRED: 'Token has expired',
    UNAUTHORIZED_ROLE: 'Unauthorized role',
    ADMIN_NOT_FOUND: 'Admin not found',
    WARDEN_NOT_FOUND: 'Warden not found',
    STUDENT_NOT_FOUND: 'Student not found',
    INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
};
