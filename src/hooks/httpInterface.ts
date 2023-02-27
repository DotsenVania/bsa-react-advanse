export interface httpOptions {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
  body?: any;
}
