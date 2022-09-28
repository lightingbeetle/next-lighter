import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import FileUploader, {
  FileUploaderArea,
  FileUploaderButton,
  FileUploaderError,
  FileUploaderPreview,
} from ".";
import { act } from "react-dom/test-utils";

describe("FileUploader", () => {
  describe("Rendering", () => {
    it("renders drag and drop variant without crashing", () => {
      render(<FileUploader id="id" data-testid="file-uploader" />);

      const fileUploader = screen.getByTestId("file-uploader");

      expect(fileUploader).toBeInTheDocument();
    });

    it("renders button variant without crashing", () => {
      render(
        <FileUploader id="id" data-testid="file-uploader">
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderButton />
          <FileUploaderError />
        </FileUploader>
      );

      const fileUploader = screen.getByTestId("file-uploader");

      expect(fileUploader).toBeInTheDocument();
    });

    it("has set default accept values", () => {
      render(<FileUploader id="id" data-testid="file-uploader" />);

      const fileUploaderInput = screen.getByTestId("file-uploader");

      expect(fileUploaderInput.getAttribute("accept")).toBe(
        "image/jpg,.jpg,.jpeg,image/png,.png,application/pdf,.pdf"
      );
    });
  });

  describe("Props", () => {
    it("returns file format error message", async () => {
      const spy = jest.fn();

      const { getByLabelText } = render(
        <FileUploader id="file-uploader" onChange={spy} />
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.mp4", {
        type: "video/mp4",
      });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining([{ error: "file-invalid-type" }])
        );
      });
    });

    it("returns file size error message", async () => {
      const spy = jest.fn();

      const { getByLabelText } = render(
        <FileUploader
          id="file-uploader"
          onChange={spy}
          dropzoneOptions={{ maxSize: 0 }}
        />
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.pdf", {
        type: "pdf",
      });

      Object.defineProperty(file, "size", { value: 1024 });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          expect.objectContaining([{ error: "file-too-large" }])
        );
      });
    });

    it("renders file from initialFiles prop correctly", () => {
      const { getByText } = render(
        <FileUploader
          id="id"
          data-testid="file-uploader"
          initialFiles={[
            {
              id: "initial-file-id",
              name: "initial-file.pdf",
              size: 156456,
            },
          ]}
        />
      );

      const initialFileName = getByText("initial-file");
      const initialFileFormatAndSize = getByText("pdf • 152.79 KB");

      expect(initialFileName).toBeInTheDocument();
      expect(initialFileFormatAndSize).toBeInTheDocument();
    });

    it("changes accepted file formats when accept prop is used", () => {
      render(
        <FileUploader
          id="id"
          data-testid="file-uploader"
          accept={{
            "application/pdf": [".pdf"],
          }}
        />
      );

      const fileUploaderInput = screen.getByTestId("file-uploader");

      expect(fileUploaderInput.getAttribute("accept")).toBe(
        "application/pdf,.pdf"
      );
    });
  });

  describe("Accessibility", () => {
    it("is accessible", async () => {
      render(<FileUploader id="id" data-testid="file-uploader" />);

      const fileUploader = screen.getByTestId("file-uploader");

      expect(await axe(fileUploader)).toHaveNoViolations();
    });
  });
});

describe("FileUploaderArea", () => {
  describe("Rendering", () => {
    it("has default area texts", () => {
      const { getByText } = render(
        <FileUploader id="id" data-testid="file-uploader" />
      );

      const areaTitle = getByText("Presuňte súbor sem alebo kliknite na");
      const areaLabel = getByText("Priložiť súbor");

      expect(areaTitle).toBeInTheDocument();
      expect(areaLabel).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("applies custom area texts", () => {
      const { getByText } = render(
        <FileUploader id="id">
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderArea
            areaTexts={{ text: "Custom text", label: "Custom label" }}
          />
          <FileUploaderError />
        </FileUploader>
      );

      const areaTitle = getByText("Custom text");
      const areaLabel = getByText("Custom label");

      expect(areaTitle).toBeInTheDocument();
      expect(areaLabel).toBeInTheDocument();
    });

    it("adds correct className for error state", () => {
      render(
        <FileUploader id="id">
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderArea data-testid="file-uploader-area" error />
          <FileUploaderError />
        </FileUploader>
      );

      const fileUploaderArea = screen.getByTestId("file-uploader-area");

      expect(fileUploaderArea).toHaveClass("file-uploader--error");
    });
  });
});

describe("FileUploaderButton", () => {
  describe("Rendering", () => {
    it("has default title", () => {
      render(
        <FileUploader id="id">
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderButton data-testid="button" />
          <FileUploaderError />
        </FileUploader>
      );

      const fileUploaderButton = screen.getByTestId("button");

      expect(fileUploaderButton).toHaveTextContent("Nahrať");
    });
  });

  describe("Props", () => {
    it("applies chilldren correctly", () => {
      render(
        <FileUploader id="id">
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderButton data-testid="button">
            Test content
          </FileUploaderButton>
          <FileUploaderError />
        </FileUploader>
      );

      const fileUploaderButton = screen.getByTestId("button");

      expect(fileUploaderButton).toHaveTextContent("Test content");
    });
  });
});

describe("FileUploaderError", () => {
  describe("Rendering", () => {
    it("renders generic error message for unsupported file format", async () => {
      const spy = jest.fn();

      const { getByLabelText, getByText } = render(
        <FileUploader id="file-uploader" onChange={spy}>
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderArea />
          <FileUploaderError data-testid="error" />
        </FileUploader>
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.mp4", {
        type: "video/mp4",
      });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        const errorMessage = getByText(
          "Súbor musí byť vo formáte .jpg, .jpeg, .png, .pdf"
        );

        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("renders generic error message for bigger file size than supported", async () => {
      const spy = jest.fn();

      const { getByLabelText, getByText } = render(
        <FileUploader id="file-uploader" onChange={spy} />
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.pdf", {
        type: "pdf",
      });

      Object.defineProperty(file, "size", { value: 999999 });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        const errorMessage = getByText("Súbor musí byť menší ako 10485.76 Kb");

        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Props", () => {
    it("renders cutom error message for unsupported format", async () => {
      const spy = jest.fn();

      const { getByLabelText, getByText } = render(
        <FileUploader id="file-uploader" onChange={spy}>
          <FileUploaderPreview onDownload={() => {}} />
          <FileUploaderArea />
          <FileUploaderError
            acceptedFormatsErrorMessage={"Custom error message"}
          />
        </FileUploader>
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.mp4", {
        type: "video/mp4",
      });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        const errorMessage = getByText("Custom error message");

        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("renders custom error message for file larger than limit", async () => {
      const spy = jest.fn();

      const { getByLabelText, getByText } = render(
        <FileUploader
          id="file-uploader"
          onChange={spy}
          dropzoneOptions={{ maxSize: 0 }}
        >
          <FileUploaderPreview />
          <FileUploaderArea />
          <FileUploaderError fileSizeErrorMessage={"Custom error"} />
        </FileUploader>
      );
      const fileUploader = getByLabelText("Nahrať súbor");

      const file = new File(["~~~"], "file.pdf", {
        type: "pdf",
      });

      Object.defineProperty(file, "size", { value: 99999 });

      Object.defineProperty(fileUploader, "files", {
        value: [file],
      });

      await act(async () => {
        fireEvent.change(fileUploader);
      });

      waitFor(() => {
        const errorMessage = getByText("Custom error");

        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});

describe("FileUploaderPreview", () => {
  describe("Props", () => {
    it("renders download a delete buttons", () => {
      const { getByText } = render(
        <FileUploader
          id="id"
          initialFiles={[
            {
              id: "initial-file-id",
              name: "initial-file.pdf",
              size: 156456,
            },
          ]}
        >
          <FileUploaderPreview
            data-testid="file-uploader-preview"
            onDownload={() => {}}
          />
          <FileUploaderButton />
          <FileUploaderError />
        </FileUploader>
      );

      const downloadButton = getByText("Stiahnuť");
      const errorButton = getByText("Vymazať");

      expect(downloadButton).toBeInTheDocument();
      expect(errorButton).toBeInTheDocument();
    });

    it("calls onDownload callback", () => {
      const spy = jest.fn();

      const { getByText } = render(
        <FileUploader
          id="id"
          initialFiles={[
            {
              id: "initial-file-id",
              name: "initial-file.pdf",
              size: 156456,
            },
          ]}
        >
          <FileUploaderPreview
            data-testid="file-uploader-preview"
            onDownload={spy}
          />
          <FileUploaderButton />
          <FileUploaderError />
        </FileUploader>
      );

      const downloadButton = getByText("Stiahnuť");

      userEvent.click(downloadButton);

      expect(spy).toHaveBeenCalled();
    });

    it("calls onDelete callback", () => {
      const spy = jest.fn();

      const { getByText } = render(
        <FileUploader
          id="id"
          initialFiles={[
            {
              id: "initial-file-id",
              name: "initial-file.pdf",
              size: 156456,
            },
          ]}
        >
          <FileUploaderPreview
            data-testid="file-uploader-preview"
            onDelete={spy}
          />
          <FileUploaderButton />
          <FileUploaderError />
        </FileUploader>
      );

      const deleteButton = getByText("Vymazať");

      userEvent.click(deleteButton);

      expect(spy).toHaveBeenCalled();
    });
  });
});
