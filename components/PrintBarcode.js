import React from "react";
import Barcode from "react-barcode";

const PrintBarcode = React.forwardRef(({ product }, ref) => (
  <div ref={ref}>
    {Array.from({ length: product.quantity }).map((_, index) => (
      <Barcode
        key={index}
        value={product.code}
        width={1}
        height={50}
        fontSize={12}
        font="mono"
        background="#fff"
      />
    ))}
  </div>
));

PrintBarcode.displayName = "PrintBarcode";

export default PrintBarcode;
