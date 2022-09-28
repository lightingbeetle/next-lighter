export function toBase64(
  file: File,
  handleLoad: (base64?: string | ArrayBuffer | null) => void,
  handleError: (error: string) => void
) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    // @ts-ignore
    handleLoad(reader.result.split(",")[1]);
  };

  reader.onerror = (error) => {
    handleError(JSON.stringify(error));
  };
}
