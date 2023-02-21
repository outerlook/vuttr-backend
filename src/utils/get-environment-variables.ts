const getEnvironmentVariableOrThrowMissing = (name: string) => {
    const value = process.env[name];
    if (!value) {
        const msg = `Missing environment variable ${name}`;
        console.error(msg);
        throw new Error(msg);
    }
    return value;
};
export const getEnvironmentVariablesOrThrowMissing = <T extends Array<string>>(
    ...names: T
): { [K in T[number]]: string } => {
    const result: { [K in T[number]]: string } = {} as any;
    for (const name of names) {
        result[name as T[number]] = getEnvironmentVariableOrThrowMissing(name);
    }
    return result;
};