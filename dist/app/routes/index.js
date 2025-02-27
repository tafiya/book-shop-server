"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { adminRoutes } from '../modules/Admin/admin.route';
// import { AuthRoutes } from '../modules/Auth/auth.route';
const admin_route_1 = require("../modules/Admin/admin.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const order_route_1 = require("../modules/order/order.route");
const product_route_1 = require("../modules/product/product.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/admin',
        route: admin_route_1.adminRoutes,
    },
    {
        path: '/products',
        route: product_route_1.productRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.orderRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
