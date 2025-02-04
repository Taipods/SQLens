"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const createDiagram_1 = require("./commands/createDiagram");
const createRelationalAlgebra_1 = require("./commands/createRelationalAlgebra");
const DBManger_1 = require("./sqlite/DBManger");
const RunQuerry_1 = require("./sqlite/RunQuerry");
let db = null; //constant for Querry Runner if is able to run
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "seeql" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('sqlExtension.openDb', async () => {
        db = await (0, DBManger_1.pullDB)();
        if (db) {
            vscode.window.showInformationMessage("Open sesame");
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('sqlExtension.runQuery', async () => {
        if (!db) {
            vscode.window.showInformationMessage("Brother where my promised DB dawg");
            return;
        }
        (0, RunQuerry_1.runQuery)(db);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('seeql.createDiagram', createDiagram_1.createDiagram));
    context.subscriptions.push(vscode.commands.registerCommand('seeql.createRelationalAlgebra', createRelationalAlgebra_1.createRelationalAlgebra));
}
// This method is called when your extension is deactivated
function deactivate() {
    // Close down Database given one is open
    if (db) {
        db.close();
    }
}
//# sourceMappingURL=extension.js.map