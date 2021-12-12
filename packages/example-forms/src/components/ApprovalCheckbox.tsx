import React from "react";
// prettier-disable-next-line
import { RadioCheck } from "components";

const ApprovalCheckbox = React.forwardRef<HTMLInputElement>(
  function ApprovalCheckbox(
    props: React.ComponentProps<typeof RadioCheck>,
    ref
  ) {
    const [showDetails, setshowDetails] = React.useState(false);

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
                aria-controls="approval-more"
                aria-expanded={showDetails ? "true" : "false"}
                onClick={() => setshowDetails((value) => !value)}
              >
                {showDetails ? "Menej" : "Viac"}
              </button>
            </>
          }
          {...props}
        />
        {showDetails && (
          <p id="approval-more" className="small text-fullwidth">
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

export default ApprovalCheckbox;
