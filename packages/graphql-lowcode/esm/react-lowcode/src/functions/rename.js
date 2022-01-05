export const renameFunctionWithMorph = (project, code, functionName, newFunctionName) => {
    const newProject = project.createSourceFile(`${newFunctionName}.tsx`, code);
    const mainFunction = newProject.getFunction(functionName);
    mainFunction === null || mainFunction === void 0 ? void 0 : mainFunction.rename(newFunctionName);
    return newProject;
};
