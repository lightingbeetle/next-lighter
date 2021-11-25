import React from "react";
import RadioCheck from "../Forms/RadioCheck";

const MarketingDetailsCheckbox = React.forwardRef<HTMLInputElement>(
  function MarketingDetailsCheckbox(
    props: React.ComponentProps<typeof RadioCheck>,
    ref
  ) {
    const [showMarketingDetails, setShowMarketingDetails] = React.useState(
      false
    );

    return (
      <>
        <RadioCheck
          ref={ref}
          type="checkbox"
          id="marketing"
          label={
            <>
              Súhlasím so spracovaním osobných údajov na marketingové účely.{" "}
              <button
                type="button"
                className="link link--underlined"
                aria-controls="marketing-more"
                aria-expanded={showMarketingDetails ? "true" : "false"}
                onClick={() => setShowMarketingDetails((value) => !value)}
              >
                {showMarketingDetails ? "Menej" : "Viac"}
              </button>
            </>
          }
          {...props}
        />
        {showMarketingDetails && (
          <p id="marketing-more" className="small text-fullwidth">
            Zaškrtnutím políčka vyjadrujem svoj súhlas s poskytnutím a
            spracovaním svojich osobných údajov spoločnosti XXX. Poskytnutie
            osobných údajov, ako aj udelenie súhlasu s ich spracovaním je
            dobrovoľné a tento súhlas je možné kedykoľvek odvolať na e-maile:{" "}
            <a className="link link--underlined" href="mailto:xxx@xxx.sk">
              xxx@xxx.sk
            </a>
            .
          </p>
        )}
      </>
    );
  }
);

export default MarketingDetailsCheckbox;
