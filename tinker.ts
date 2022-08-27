import * as fs from "fs";
import { Project, SyntaxKind, CallExpression } from "ts-morph";

async function createModifiedFile(
    inputFilePath: string,
    outputFilePath: string
) {
    const code = await fs.promises.readFile(inputFilePath, "utf8");

    const project = new Project();
    const sourceFile = project.createSourceFile(outputFilePath, code, {
        overwrite: true,
    });

    const lastStatement = sourceFile.getStatements().at(-1);
    const wrapped = `console.log(${lastStatement.getText().replace(";", "")})`;
    lastStatement.replaceWithText(wrapped);

    await sourceFile.save();
}

async function importModuleDynamically(filePath: string) {
    await import(filePath);
}

await createModifiedFile("sample.ts", "temp.ts");
await importModuleDynamically("./temp.ts");
