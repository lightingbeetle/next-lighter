import React from "react";
import { RadioCheck } from "components";
import { useFormContext } from "react-hook-form";

const ApprovalCheckbox = React.forwardRef<HTMLInputElement>(
  function ApprovalCheckbox(
    props: React.ComponentProps<typeof RadioCheck>,
    ref
  ) {
    const [showDetails, setshowDetails] = React.useState(false);
    const {
      formState: { errors },
    } = useFormContext();

    const error = errors[props.name];

    return (
      <>
        <RadioCheck
          ref={ref}
          type="checkbox"
          id="marketing"
          label={
            <>
              Súhlasím so spracovaním osobných údajov na marketingové účely.
              <details
                open={showDetails}
                onClick={(e) => {
                  e.preventDefault();
                  setshowDetails(!showDetails);
                }}
              >
                <summary>
                  {showDetails ? "Menej informácií" : "Viac informácií"}
                </summary>
                <p id="approval-more" className="small text-fullwidth">
                  Zaškrtnutím políčka vyjadrujem svoj súhlas s poskytnutím a
                  spracovaním svojich osobných údajov spoločnosti XXX.
                  Poskytnutie osobných údajov, ako aj udelenie súhlasu s ich
                  spracovaním je dobrovoľné a tento súhlas je možné kedykoľvek
                  odvolať na e-maile:{" "}
                  <a className="link link--underlined" href="mailto:xxx@xxx.sk">
                    xxx@xxx.sk
                  </a>
                  .
                </p>
              </details>
            </>
          }
          error={error}
          {...props}
        />
      </>
    );
  }
);

export default ApprovalCheckbox;
