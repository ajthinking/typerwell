import * as vscode from "vscode";
import { runFile } from "./runFile";

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "typerwell" is now active!');

    let disposable = vscode.commands.registerCommand(
        "typerwell.runFile",
        runFile
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
