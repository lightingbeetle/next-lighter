import "./styles/globals.scss";

import Bar, { BarItem, BarBreak } from "./components/Bar";
import Button from "./components/Button";
import Card, {
  CardAction,
  CardSection,
  CardSectionImage,
  CardTitle,
} from "./components/Card";
import FileUploader, {
  FileUploaderArea,
  FileUploaderButton,
  FileUploaderError,
  FileUploaderPreview,
} from "./components/FileUploader";
import { Input, TextArea, RadioCheck, Error } from "./components/Forms";
import Icon from "./components/Icon";
import Select from "./components/Select";
import Table from "./components/Table";
import Slider from "./components/Slider";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";

// TODO: Tokens should have own entry
import {
  color,
  colorHex,
  colors,
  breakpoints,
  spaces,
  fonts,
  shadows,
} from "./tokens";

import "./styles/utilities.scss";
import "./styles/layout.scss";

export const tokens = {
  color,
  colorHex,
  colors,
  breakpoints,
  spaces,
  fonts,
  shadows,
};

export {
  Bar,
  BarItem,
  BarBreak,
  Button,
  Card,
  CardAction,
  CardSectionImage,
  CardSection,
  CardTitle,
  FileUploader,
  FileUploaderArea,
  FileUploaderButton,
  FileUploaderError,
  FileUploaderPreview,
  Modal,
  Icon,
  Select,
  Table,
  Input,
  TextArea,
  RadioCheck,
  Error,
  Slider,
  Pagination,
};
