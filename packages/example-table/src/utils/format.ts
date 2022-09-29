import wnumb from "wnumb";

type Format = {
  decimals: number;
  mark: string;
  thousand: string;
  suffix: string;
};

export const defaultNumberFormat = {
  decimals: 2,
  mark: ",",
  thousand: `\xa0`,
};

export const defaultPriceFormat = {
  ...defaultNumberFormat,
  suffix: `\xa0€`,
};

export function formatPrice(price: number, format?: Format) {
  return wnumb({
    ...defaultPriceFormat,
    ...format,
    ...(price % 1 === 0 ? { decimals: 0 } : {}), // integers without decimals
  }).to(price);
}

export const defaultAreaFormat = {
  ...defaultNumberFormat,
  suffix: ` m\xB2`,
};
