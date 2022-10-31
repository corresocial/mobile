import React from "react";
import { SaleData } from "./types";

export const saleContext = {
    saleData: {} as SaleData,
    setSaleDataOnContext: (saleDataValue: {}) => {
        saleContext.saleData = {
            ...saleContext.saleData,
            ...saleDataValue
        }
    }
}

export const SaleContext = React.createContext(saleContext);