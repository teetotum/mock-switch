declare module "mock-switch" {
  export const mockSwitch: {
    (qualifier: string, choices: Array<string>): string;
  };
}
