import { fstat } from "fs";
import * as vscode from "vscode";
import * as fs from "fs";

// vscode.window.showInformationMessage(`Found executor ${executor}`);

export const runFile = () => {
    const path = getRunnablePath();
    vscode.window.showInformationMessage(`Running ${path}`);
    const wrapper = `./typerwellFileWrapper.ts`;
    const tsNodeBin = getTsNodeBin();
    vscode.window.showInformationMessage(`tsNodeBin ${tsNodeBin}`);
    // const command = `npx ${tsNodeBin} ${wrapper} ${path}`;
    // const command = 'open -a "Google Chrome"';

    // Create the command
    const command = `npx ${tsNodeBin} ${path}`;

    // Run the command
    vscode.commands.executeCommand("workbench.action.terminal.sendSequence", {
        text: command + "\r",
    });
};

const getRunnablePath = () => {
    const path = vscode.window.activeTextEditor?.document?.fileName;

    if (!path) throw Error("Could not find active file!");
    if (!path.endsWith(".ts")) throw Error("Must be a typescript file!");

    return path;
};

const getTsNodeBin = () => {
    if (hasLocalTsNodeBin()) {
        return "ts-node";
    } else {
        return `${__dirname}/node_modules/ts-node`;
    }
};

const hasLocalTsNodeBin = () => {
    const tsNodeBinPath = `${getRootPath()}/node_modules/.bin/ts-node`;

    return fs.existsSync(tsNodeBinPath);
};

const getRootPath = () => {
    return vscode.workspace?.workspaceFolders?.[0]?.uri?.fsPath;
};
