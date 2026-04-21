"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Rsvp = exports.Event = void 0;
const mongodb_1 = require("./mongodb");
const Event_1 = __importDefault(require("../models/Event"));
exports.Event = Event_1.default;
const Rsvp_1 = __importDefault(require("../models/Rsvp"));
exports.Rsvp = Rsvp_1.default;
const Order_1 = __importDefault(require("../models/Order"));
exports.Order = Order_1.default;
// Connect to MongoDB on import
(0, mongodb_1.connectDB)().catch(console.error);
exports.default = { Event: Event_1.default, Rsvp: Rsvp_1.default, Order: Order_1.default };
