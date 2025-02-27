"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.patch('/users/:userId/block', (0, auth_1.auth)('Admin'), admin_controller_1.AdminController.blockUser);
router.delete('/products/:id', (0, auth_1.auth)('Admin'), admin_controller_1.AdminController.deleteProduct);
exports.adminRoutes = router;
