import { httpOptions } from "./httpInterface";
export default function useHttpRequest() {
  const request = async (url: string, options?: httpOptions) => {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  };

  return { request };
}
