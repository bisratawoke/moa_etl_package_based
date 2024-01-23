export enum etlExceptionType {
  EXTRACTION = "EXTRACTION",
  TRANSFORMATION = "TRANSFORMATION",
  LOADING = "LOADING",
}
export default class etlExceptions extends Error {
  type: etlExceptionType;
  constructor(message: string, type: etlExceptionType) {
    super(message);
    this.type = type;
  }
}
