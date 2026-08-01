var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { NextResponse } from 'next/server';
/**
 * Success Response (200)
 */
export var successResponse = function (data, message, statusCode) {
    if (message === void 0) { message = 'Success'; }
    if (statusCode === void 0) { statusCode = 200; }
    return NextResponse.json({
        success: true,
        statusCode: statusCode,
        message: message,
        data: data,
    }, { status: statusCode });
};
/**
 * Created Response (201)
 */
export var createdResponse = function (data, message) {
    if (message === void 0) { message = 'Resource created successfully'; }
    return NextResponse.json({
        success: true,
        statusCode: 201,
        message: message,
        data: data,
    }, { status: 201 });
};
/**
 * Bad Request Response (400)
 */
export var badRequestResponse = function (error, details) {
    return NextResponse.json({
        success: false,
        statusCode: 400,
        error: error,
        details: details,
    }, { status: 400 });
};
/**
 * Unauthorized Response (401)
 */
export var unauthorizedResponse = function (error) {
    if (error === void 0) { error = 'Unauthorized'; }
    return NextResponse.json({
        success: false,
        statusCode: 401,
        error: error,
    }, { status: 401 });
};
/**
 * Forbidden Response (403)
 */
export var forbiddenResponse = function (error) {
    if (error === void 0) { error = 'Forbidden'; }
    return NextResponse.json({
        success: false,
        statusCode: 403,
        error: error,
    }, { status: 403 });
};
/**
 * Not Found Response (404)
 */
export var notFoundResponse = function (resource) {
    if (resource === void 0) { resource = 'Resource'; }
    return NextResponse.json({
        success: false,
        statusCode: 404,
        error: "".concat(resource, " not found"),
    }, { status: 404 });
};
/**
 * Conflict Response (409)
 */
export var conflictResponse = function (error) {
    return NextResponse.json({
        success: false,
        statusCode: 409,
        error: error,
    }, { status: 409 });
};
/**
 * Server Error Response (500)
 */
export var serverErrorResponse = function (error, details) {
    if (error === void 0) { error = 'Internal server error'; }
    console.error('Server error:', error, details);
    return NextResponse.json(__assign({ success: false, statusCode: 500, error: error }, (process.env.NODE_ENV === 'development' && { details: details })), { status: 500 });
};
/**
 * Wrap response with Set-Cookie header
 */
export var withCookies = function (response, cookies) {
    cookies.forEach(function (cookie) {
        response.headers.append('Set-Cookie', cookie);
    });
    return response;
};
