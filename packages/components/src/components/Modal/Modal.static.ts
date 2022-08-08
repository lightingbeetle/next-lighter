import A11yDialog from "a11y-dialog";

function defaultConfig() {
  return {
    /** Class which indicates that modal is open */
    classModalIsOpen: "is-active",
    /** Class on body which indicates that modal is open */
    classModalIsOpenBody: "has-modal",
    /** Root of page content which should be hidden when modal is open */
    root: document.getElementById("root"),
    /** Element on page where modal is be placed. This elements should placed outside main content (`root` option) and usually at the and of `<body />` tag. */
    modalsRoot: document.getElementById("root-modals"),
    /** On show callback function. */
    onShow: () => {},
    /** On hide callback function. */
    onHide: () => {},
    /** Should portal modal into this selector (must be unique in DOM) */
    portal: "#root-modals",
  };
}

type ModalConfig = {
  classModalIsOpen: string;
  classModalIsOpenBody: string;
  root: HTMLElement | null;
  modalsRoot: HTMLElement | null;
  onShow: () => void;
  onHide: () => void;
  portal: string | null;
};

export default class Modal {
  element: HTMLElement;
  config: ModalConfig;
  instance: A11yDialog | null = null;
  rootModals: HTMLElement | null = null;
  originalParent: HTMLElement;

  constructor(element: HTMLElement, config?: Partial<ModalConfig>) {
    this.element = element;
    this.config = { ...defaultConfig(), ...config };
    this.originalParent = element.parentElement!;

    this.init();

    //@ts-ignore
    this.element.DDL_Modal = this;
  }

  handleShow = (el: Element) => {
    this.lockBody();
    if (el) {
      el.classList.add(this.config.classModalIsOpen);
    }

    // Long modals can have first focusable element under the fold, so static content above the fold should be focused instead to prevent undesirable scrolling
    const initialFocusEl = el.querySelector<HTMLElement>(".modal__header h2");

    initialFocusEl?.focus();

    this.config.onShow();
  };

  handleHide = (el: Element) => {
    this.unlockBody();
    if (el) {
      el.classList.remove(this.config.classModalIsOpen);
    }
    this.config.onHide();
  };

  show = () => {
    this.instance?.show();
  };

  hide = () => {
    this.instance?.hide();
  };

  init() {
    if (this.config.portal) {
      this.portal(
        this.element,
        document.querySelector(this.config.portal) as HTMLElement
      );
    }

    if (!this.config.root) {
      console.error("`root` has to be provied in Modal config");
      return;
    }

    this.instance = new A11yDialog(this.element, this.config.root);

    this.instance.on("show", this.handleShow);
    this.instance.on("hide", this.handleHide);
  }

  static getInstance(el: HTMLElement) {
    // @ts-ignore
    return el && el.DDL_Modal ? el.DDL_Modal : null;
  }

  destroy() {
    this.restoreToOriginalLocation();
    this.instance?.destroy();
  }

  update() {
    this.destroy();
    this.init();
  }

  portal(el: HTMLElement, container: HTMLElement) {
    if (container) {
      container.appendChild(el);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `\`portal: ${this.config.portal}\` element is not present in DOM. Modal will be placed inside content which can affect it's styleing. Please provide \`portal\` selector (should be placed outside of main contant, usualy in end of <body /> tag)`
      );
    }
  }

  restoreToOriginalLocation() {
    if (this.rootModals) {
      this.originalParent.appendChild(this.element);
    }
  }

  lockBody(
    className = this.config.classModalIsOpenBody,
    container = this.config.root
  ) {
    // store current scrollTop value
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    document.body.setAttribute("data-lock-scrolltop", `${scrollTop}`);

    // add locking styles to body
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    // add locking styles to scrollTop
    if (container) {
      /* eslint-disable no-param-reassign */
      container.style.height = "100%";
      container.style.width = "100%";
      container.style.overflow = "hidden";
      container.style.position = "fixed";
      // scroll page-container to scrollTop position
      container.scrollTop = scrollTop;
      /* eslint-enable no-param-reassign */
    }

    // add modal class
    document.body.classList.add(className);

    // attempt to scroll top fixed position
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop);
    });
  }

  unlockBody() {
    const scrollTop = document.body.getAttribute("data-lock-scrolltop");
    const className = this.config.classModalIsOpenBody;
    const container = this.config.root;

    // remove locking styles from body
    document.body.style.height = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.position = "";

    // add modal class
    document.body.classList.remove(className);

    // remove locking styles from page-container
    if (container) {
      /* eslint-disable no-param-reassign */
      container.style.height = "";
      container.style.width = "";
      container.style.overflow = "";
      container.style.position = "";
      /* eslint-enable no-param-reassign */
    }

    // set scroll position back
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollTop ? +scrollTop : 0);
    });
  }
}
