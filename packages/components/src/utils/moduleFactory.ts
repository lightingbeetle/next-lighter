// TODO: add typescript support for passing module as class

function moduleFactory(
  module: (element: HTMLElement, options?: object) => any,
  selector: string,
  options: object = {}
): void {
  const elements = Array.from(document.querySelectorAll(selector));

  // FIXME: is this working also when module is class, because compiler is transpiling classses to functions?
  elements.forEach((element) => module(element as HTMLElement, options));
}

export default moduleFactory;
