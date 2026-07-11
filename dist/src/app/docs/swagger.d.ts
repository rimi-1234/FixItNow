export declare const swaggerSpec: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
        contact: {
            name: string;
            email: string;
        };
    };
    servers: {
        url: string;
        description: string;
    }[];
    components: {
        securitySchemes: {
            BearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
        };
        schemas: {
            ErrorResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    message: {
                        type: string;
                        example: string;
                    };
                    errorDetails: {
                        type: string;
                    };
                };
            };
            SuccessResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    message: {
                        type: string;
                    };
                    data: {
                        type: string;
                    };
                };
            };
            RegisterRequest: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                        example: string;
                    };
                    role: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                    skills: {
                        type: string;
                        items: {
                            type: string;
                        };
                        example: string[];
                        description: string;
                    };
                    experience: {
                        type: string;
                        example: number;
                        description: string;
                    };
                    hourlyRate: {
                        type: string;
                        example: number;
                        description: string;
                    };
                    bio: {
                        type: string;
                        example: string;
                    };
                    location: {
                        type: string;
                        example: string;
                        description: string;
                    };
                };
            };
            LoginRequest: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        example: string;
                    };
                };
            };
            BookingCreate: {
                type: string;
                required: string[];
                properties: {
                    technicianId: {
                        type: string;
                        format: string;
                    };
                    serviceId: {
                        type: string;
                        format: string;
                    };
                    scheduledTime: {
                        type: string;
                        format: string;
                        example: string;
                    };
                };
            };
            PaymentCreate: {
                type: string;
                required: string[];
                properties: {
                    bookingId: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    provider: {
                        type: string;
                        enum: string[];
                        default: string;
                        description: string;
                    };
                };
            };
            ReviewCreate: {
                type: string;
                required: string[];
                properties: {
                    bookingId: {
                        type: string;
                        format: string;
                        description: string;
                    };
                    rating: {
                        type: string;
                        minimum: number;
                        maximum: number;
                        example: number;
                    };
                    comment: {
                        type: string;
                        example: string;
                    };
                };
            };
            BookingStatusUpdate: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                };
            };
            UserStatusUpdate: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                };
            };
            CategoryCreate: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        example: string;
                    };
                    slug: {
                        type: string;
                        example: string;
                    };
                };
            };
            CategoryUpdate: {
                type: string;
                properties: {
                    name: {
                        type: string;
                        example: string;
                    };
                    slug: {
                        type: string;
                        example: string;
                    };
                };
            };
            ServiceCreate: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                        example: string;
                    };
                    description: {
                        type: string;
                        example: string;
                    };
                    price: {
                        type: string;
                        example: number;
                    };
                    categoryId: {
                        type: string;
                        format: string;
                    };
                };
            };
            ServiceUpdate: {
                type: string;
                properties: {
                    name: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                    price: {
                        type: string;
                    };
                    categoryId: {
                        type: string;
                        format: string;
                    };
                };
            };
            AvailabilityUpdate: {
                type: string;
                required: string[];
                properties: {
                    availability: {
                        type: string;
                        items: {
                            type: string;
                        };
                        example: string[];
                    };
                };
            };
        };
    };
    paths: {
        '/auth/register': {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    409: {
                        description: string;
                    };
                };
            };
        };
        '/auth/login': {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    401: {
                        description: string;
                    };
                };
            };
        };
        '/auth/me': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    401: {
                        description: string;
                    };
                };
            };
        };
        '/services': {
            get: {
                tags: string[];
                summary: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        minimum?: undefined;
                        maximum?: undefined;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        minimum: number;
                        maximum: number;
                    };
                    description: string;
                })[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/services/{id}': {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/technicians': {
            get: {
                tags: string[];
                summary: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        minimum?: undefined;
                        maximum?: undefined;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        minimum: number;
                        maximum: number;
                    };
                    description: string;
                })[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/technicians/{id}': {
            get: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/categories': {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                };
            };
        };
        '/categories/{id}': {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/bookings': {
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                };
            };
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/bookings/{id}': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/bookings/{id}/cancel': {
            patch: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/payments/create': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                        content: {
                            'application/json': {
                                examples: {
                                    stripe: {
                                        summary: string;
                                        value: {
                                            success: boolean;
                                            message: string;
                                            data: {
                                                provider: string;
                                                gatewayUrl: string;
                                                sessionId: string;
                                                payment: {
                                                    id: string;
                                                    status: string;
                                                };
                                            };
                                        };
                                    };
                                    sslcommerz: {
                                        summary: string;
                                        value: {
                                            success: boolean;
                                            message: string;
                                            data: {
                                                provider: string;
                                                gatewayUrl: string;
                                                payment: {
                                                    id: string;
                                                    status: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/payments/confirm': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/payments/sslcommerz/success': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    content: {
                        'application/x-www-form-urlencoded': {
                            schema: {
                                type: string;
                                properties: {
                                    tran_id: {
                                        type: string;
                                    };
                                    val_id: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    302: {
                        description: string;
                    };
                };
            };
        };
        '/payments/sslcommerz/fail': {
            post: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                    };
                    302: {
                        description: string;
                    };
                };
            };
        };
        '/payments/sslcommerz/cancel': {
            post: {
                tags: string[];
                summary: string;
                responses: {
                    200: {
                        description: string;
                    };
                    302: {
                        description: string;
                    };
                };
            };
        };
        '/payments/sslcommerz/ipn': {
            post: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/payments': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/payments/{id}': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/technicians/profile': {
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                type: string;
                                properties: {
                                    skills: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                        example: string[];
                                    };
                                    experience: {
                                        type: string;
                                        example: number;
                                    };
                                    hourlyRate: {
                                        type: string;
                                        example: number;
                                    };
                                    bio: {
                                        type: string;
                                        example: string;
                                    };
                                    location: {
                                        type: string;
                                        example: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                };
            };
        };
        '/technicians/availability': {
            put: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/technicians/bookings': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/technicians/bookings/{id}': {
            patch: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                };
            };
        };
        '/reviews': {
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
        '/admin/users': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                    };
                    description?: undefined;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum?: undefined;
                    };
                    description: string;
                })[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/admin/users/{id}': {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
        '/admin/bookings': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
        };
        '/admin/categories': {
            get: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                };
            };
        };
        '/admin/categories/{id}': {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    200: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    BearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    200: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                };
            };
        };
    };
    tags: {
        name: string;
        description: string;
    }[];
};
//# sourceMappingURL=swagger.d.ts.map