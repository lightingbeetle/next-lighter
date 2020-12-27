function moduleFactory(
  module: (element: HTMLElement, options?: object) => any,
  selector: string,
  options: object = {}
): void {
  const elements = Array.from(document.querySelectorAll(selector));

  elements.forEach((element) => module(element as HTMLElement, options));
}

export default moduleFactory;
