export default class Table {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;

    this.handleScrollableTable = this.handleScrollableTable.bind(this);

    this.init();

    // @ts-ignore
    this.element.DDL_Table = this;
  }

  init() {
    if (!this.element) {
      return;
    }

    //@ts-ignore
    this.tableElement = this.element.querySelector("table");

    //@ts-ignore
    if (this.tableElement) {
      this.handleScrollableTable();
      window.addEventListener("resize", this.handleScrollableTable);
    }
  }

  static getInstance(el: HTMLElement) {
    // @ts-ignore
    return el && el.DDL_Table ? el.DDL_Table : null;
  }

  /* 
  Function that determines if table is scrollable.
  It uses tableWrapper (this.element), which is DIV element wrapping table and table element (table inside this.element).

  This function compares tableWrapper's clientWidth and clientHeight with table element's scrollWidth and scrollHeight.
  If table element's values are greater than tableWrapper's value it returns true and it means that table is scrollable.

  It's because :
  - scrollWidth returns the width of the content enclosed in an html element including padding but not margin, border and scroll bar.
  - scrollHeight returns the height of the content enclosed in an html element including padding but not margin, border and scroll bar.
  - clientWidth returns the width of an HTML element including padding in pixels but does not include margin, border and scrollbar width.
  - clientHeight returns the height of an HTML element including padding in pixels but does not include margin, border and scrollbar height.

  So if table element's scrollWidth or scrollHeight is greater than tableWrapper's clientWidth or clientHeight, that means that table element is larger than the element in which it is enclosed (tableWrapper).
  
  window.screen.width part of condition is there mainly for testing reasons since in JSDOM dimensions such as clientWidth, clientHeight, scrollWidth or scrollHeight are always 0. 
  So to test this solution I've added condition where this attribute is added when screen width is smaller than 100px. (No matter how big is data which is placed in table, in this screen width it will be scrolling for sure)
  */

  handleScrollableTable = () => {
    if (
      //@ts-ignore
      this.tableElement.scrollWidth > this.element.clientWidth ||
      //@ts-ignore
      this.tableElement.scrollHeight > this.element.clientHeight ||
      window.screen.width < 100
    ) {
      return this.element.setAttribute("tabIndex", "0");
    } else {
      return this.element.removeAttribute("tabIndex");
    }
  };

  update() {
    this.init();
    this.destroy();
  }

  destroy() {
    window.removeEventListener("resize", this.handleScrollableTable);
  }
}
