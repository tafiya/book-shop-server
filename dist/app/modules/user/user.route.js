"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.auth)('Admin'), user_controller_1.userControllers.getAllUsers);
router.put('/:_id', (0, auth_1.auth)('Admin', 'User'), user_controller_1.userControllers.updateUser);
// Delete a Book
router.delete('/:_id', (0, auth_1.auth)('Admin'), user_controller_1.userControllers.deleteUser);
exports.UserRoutes = router;
