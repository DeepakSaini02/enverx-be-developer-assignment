class HttpException extends Error {
    public httpStatus: number;
    public message: string;
    public status: string;
  
    constructor(httpStatus: number, message: string, status: string) {
      super(message);
      this.httpStatus = httpStatus;
      this.message = message;
      this.status = status;
    }
  }
  
  export default HttpException;