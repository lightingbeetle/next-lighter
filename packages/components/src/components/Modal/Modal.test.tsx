import React from "react";
import ReactDOMServer from "react-dom/server";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../Button/Button";

import Modal from "./Modal";
import ModalStatic from "./Modal.static";

// Poor man's polyfills
window.scrollTo = () => {};
const { getComputedStyle } = window;
window.getComputedStyle = (el) => getComputedStyle(el);

// Helper funciton to render element without React in runtime
function renderWithoutRuntime(element: any) {
  const div = document.createElement("div");

  div.innerHTML = ReactDOMServer.renderToStaticMarkup(element);

  // roots is expexted to exists and it's setuped in jest-setup file
  document.getElementById("root")?.appendChild(div);

  return div;
}

const Example = React.forwardRef(function Example(
  props: Partial<Modal>,
  ref: any
) {
  return (
    <>
      <Button data-a11y-dialog-show="modal">trigger</Button>
      <Modal ref={ref} id="modal" header="Title" {...props}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    </>
  );
});

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div><div id="root-modals"></div>';
});

describe("Modal", () => {
  describe("automated accessibility testing", () => {});
  describe("with a screenreader", () => {});

  describe("renders", () => {
    it("renders Modal", () => {
      render(<Example />, { container: document.getElementById("root")! });

      const el = screen.getByRole("dialog", { hidden: true });

      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-hidden", "true");
      expect(el).toHaveAttribute("id", "modal");
    });

    it("renders Modal title", () => {
      render(<Example />, { container: document.getElementById("root")! });

      const title = screen.getByRole("heading", { hidden: true });

      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Title");
    });

    it("renders Modal content", () => {
      render(<Example />, { container: document.getElementById("root")! });

      const content = screen.getByTestId("modal-content");

      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent("Content");
    });

    it("renders Modal close button", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByRole("button", {
        hidden: true,
        name: "Zatvoriť modal",
      });

      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("data-a11y-dialog-hide");
    });

    it("renders Modal overlay", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const el = document.querySelector(".modal__overlay");

      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("data-a11y-dialog-hide");
    });
  });

  describe("lifecycle", () => {
    it("rerender isVisible", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByRole("dialog", { hidden: true });
      expect(el).toBeInTheDocument();

      expect(el).toHaveAttribute("aria-hidden");

      render(<Example isVisible />, {
        container: document.getElementById("root")!,
      });

      expect(el).not.toHaveAttribute("aria-hidden");

      render(<Example />, {
        container: document.getElementById("root")!,
      });

      expect(el).toHaveAttribute("aria-hidden");
    });

    it("unmounts Modal", () => {
      const { unmount } = render(<Example />, {
        container: document.getElementById("root")!,
      });

      unmount();

      const rootModals = document.getElementById("root-modals");

      expect(rootModals).toBeEmptyDOMElement();
    });
  });

  describe("props", () => {
    it("isVisible", () => {
      render(<Example isVisible />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByRole("dialog");

      expect(el).toBeInTheDocument();
      expect(el).not.toHaveAttribute("aria-hidden");
    });

    it("header", () => {
      render(<Example header={<div data-testid="header">Header</div>} />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByTestId("header");

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent("Header");
    });

    it("footer", () => {
      render(<Example footer={<div data-testid="footer">Footer</div>} />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByTestId("footer");

      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent("Footer");
    });

    it("closeOnOverlayClick", () => {
      render(<Example closeOnOverlayClick={false} />, {
        container: document.getElementById("root")!,
      });

      const el = document.querySelector(".modal__overlay");

      expect(el).toBeInTheDocument();
      expect(el).not.toHaveAttribute("data-a11y-dialog-hide");
    });

    it("onShow", () => {
      const onShowSpy = jest.fn();
      render(<Example onShow={onShowSpy} />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      expect(onShowSpy).toHaveBeenCalledTimes(1);
    });

    it("onHide", () => {
      const onHideSpy = jest.fn();
      render(<Example onHide={onHideSpy} />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      const el = screen.getByRole("button", {
        name: "Zatvoriť modal",
      });

      userEvent.click(el);

      expect(onHideSpy).toHaveBeenCalledTimes(1);
    });

    it("ref show/hide", () => {
      const modalRef = React.createRef<Modal["ref"]>();

      const show = () => modalRef.current?.show();
      const hide = () => modalRef.current?.hide();

      render(<Example ref={modalRef} />, {
        container: document.getElementById("root")!,
      });

      const el = screen.getByRole("dialog", { hidden: true });

      expect(el).toBeInTheDocument();
      expect(el).toHaveAttribute("aria-hidden");

      show();

      expect(el).not.toHaveAttribute("aria-hidden");

      hide();

      expect(el).toHaveAttribute("aria-hidden");
    });
  });

  describe("events", () => {
    it("opens on trigger click", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      const el = screen.getByRole("dialog");

      expect(el).toBeInTheDocument();
      expect(el).not.toHaveAttribute("aria-hidden");
    });

    it("closes on close button click", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      const closeEl = screen.getByRole("button", {
        name: "Zatvoriť modal",
      });
      const el = screen.getByRole("dialog");

      expect(el).not.toHaveAttribute("aria-hidden");

      userEvent.click(closeEl);

      expect(el).toHaveAttribute("aria-hidden");
    });

    it("closes on overlay click", () => {
      render(<Example />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      const overlayEl = document.querySelector(".modal__overlay");
      const el = screen.getByRole("dialog");

      expect(el).not.toHaveAttribute("aria-hidden");

      userEvent.click(overlayEl!);

      expect(el).toHaveAttribute("aria-hidden");
    });

    it("not closes on overlay click with closeOnOverlayClick", () => {
      render(<Example closeOnOverlayClick={false} />, {
        container: document.getElementById("root")!,
      });

      const trigger = screen.getByRole("button");

      userEvent.click(trigger);

      const overlayEl = document.querySelector(".modal__overlay");
      const el = screen.getByRole("dialog");

      expect(el).not.toHaveAttribute("aria-hidden");

      userEvent.click(overlayEl!);

      expect(el).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("JS API", () => {
    it("returns instance", () => {
      const container = renderWithoutRuntime(
        <Example shouldUsePortal={false} />
      );
      const element = container.querySelector("#modal");

      const instance = new ModalStatic(element as HTMLElement);

      expect(instance).toBeDefined();
    });

    it("has getInstance", () => {
      const container = renderWithoutRuntime(
        <Example shouldUsePortal={false} />
      );
      const element = container.querySelector("#modal");

      new ModalStatic(element as HTMLElement);

      expect(ModalStatic.getInstance(element as HTMLElement)).toBeDefined();
    });

    it("show", () => {
      const onShowSpy = jest.fn();
      const container = renderWithoutRuntime(
        <Example shouldUsePortal={false} />
      );
      const element = container.querySelector("#modal");

      const instance = new ModalStatic(element as HTMLElement, {
        onShow: onShowSpy,
      });

      instance.show();

      expect(onShowSpy).toHaveBeenCalledTimes(1);
      expect(element).not.toHaveAttribute("aria-hidden");
    });

    it("hide", () => {
      const onHideSpy = jest.fn();
      const container = renderWithoutRuntime(
        <Example shouldUsePortal={false} />
      );
      const element = container.querySelector("#modal");

      const instance = new ModalStatic(element as HTMLElement, {
        onHide: onHideSpy,
      });

      instance.show();
      instance.hide();

      expect(onHideSpy).toHaveBeenCalledTimes(1);
      expect(element).toHaveAttribute("aria-hidden");
    });

    it("onShow", () => {
      const onShowSpy = jest.fn();
      const container = renderWithoutRuntime(
        <Example shouldUsePortal={false} />
      );
      const element = container.querySelector("#modal");
      const trigger = screen.getByRole("button");

      new ModalStatic(element as HTMLElement, {
        onShow: onShowSpy,
      });

      userEvent.click(trigger!);

      expect(onShowSpy).toHaveBeenCalledTimes(1);
      expect(element).not.toHaveAttribute("aria-hidden");
    });

    it("onHide", () => {
      const onHideSpy = jest.fn();
      renderWithoutRuntime(<Example shouldUsePortal={false} />);
      const element = document.querySelector("#modal");
      const trigger = screen.getByRole("button");

      new ModalStatic(element as HTMLElement, {
        onHide: onHideSpy,
      });

      userEvent.click(trigger!);

      const closeEl = screen.getByRole("button", {
        name: "Zatvoriť modal",
      });

      userEvent.click(closeEl);

      expect(onHideSpy).toHaveBeenCalledTimes(1);
      expect(element).toHaveAttribute("aria-hidden");
    });
  });
});
