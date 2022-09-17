import { fstat } from "fs";
import * as vscode from "vscode";
import * as fs from "fs";
import { Project, SyntaxKind, CallExpression } from "ts-morph";
import * as os from "os";

export const runFile = async () => {
  const path = getRunnablePath();
  const tsNodeBin = getTsNodeBin();

  // wrap last statement in console.log
  const wrapped = `${os.tmpdir()}/wrapped.ts`;
  await createModifiedFile(path, wrapped);
  //   await import(wrapped);

  const command = `npx ${tsNodeBin} ${wrapped}`;

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

const createModifiedFile = async (inputFilePath: string, outputFilePath: string) => {
  const code = await fs.promises.readFile(inputFilePath, "utf8");

  const project = new Project({
    tsConfigFilePath: `${getRootPath()}/tsconfig.json`,
  });
  const sourceFile = project.createSourceFile(outputFilePath, code, {
    overwrite: true,
  });

  const lastStatement = sourceFile.getStatements().at(-1);
  if (!lastStatement) return;
  const wrapped = `console.log(${lastStatement.getText().replace(";", "")})`;
  lastStatement.replaceWithText(wrapped);

  await sourceFile.save();
};
