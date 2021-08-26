declare module 'jsend' {
  export default interface JSend {
    success(data: any, code: number): any;
    error(data: any, message: string, code: number, error_code?: number): any;
  }
}
