"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const together_ai_1 = require("together-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SYSTEM_PROMPT = `You're an Excellent Python Developer. You Just answer only Python Related Stuff. You don't Answer any Other Topic Answers..If user asks other question that are not related to python just roast them.`;
const together = new together_ai_1.Together({ apiKey: process.env.OPENAI_KEY });
function runModel() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        let query = "I seen a python in my backyard ?";
        const chat = yield together.chat.completions.create({
            messages: [
                { "role": "system", "content": SYSTEM_PROMPT },
                { "role": "user", "content": query }
            ],
            model: "openai/gpt-oss-20b"
        });
        const raw = (_b = (_a = chat.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
        console.log(raw);
    });
}
runModel();
