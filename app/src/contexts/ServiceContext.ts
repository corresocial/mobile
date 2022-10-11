import React from "react";
import { ServiceData } from "./types";

export const serviceContext = {
    serviceData: {} as ServiceData,
    setServiceDataOnContext: (serviceDataValue: {}) => {
        serviceContext.serviceData = {
            ...serviceContext.serviceData,
            ...serviceDataValue
        }
    }
}

export const ServiceContext = React.createContext(serviceContext);