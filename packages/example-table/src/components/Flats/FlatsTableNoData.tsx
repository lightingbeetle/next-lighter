import React from "react";

const FlatsTableNoData = () => {
  return (
    <div className="flats__table-no-data">
      <p>
        Vaše požiadavky aktuálne nespĺňa žiaden byt ani apartmán.
        <br />
        <br />
        <span className="bold">Prosím, skúste vybrať iné parametre.</span>
      </p>
    </div>
  );
};

export default FlatsTableNoData;
