import React from "react";

export const serviceContext = {
    serviceData: {}
    ,
    setServiceDataOnContext: (serviceDataValue: any) => {
        serviceContext.serviceData = {
            ...serviceContext.serviceData,
            ...serviceDataValue
        }
    }
}

export const ServiceContext = React.createContext(serviceContext);