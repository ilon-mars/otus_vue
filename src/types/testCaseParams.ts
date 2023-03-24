export interface TestCaseParams {
  params: {
    props?: {
      [key: string]: unknown;
    };
    slots?: {
      default: string;
      [key: string]: string;
    };
  };
  testValue?: any;
  expectedResult: any;
}
