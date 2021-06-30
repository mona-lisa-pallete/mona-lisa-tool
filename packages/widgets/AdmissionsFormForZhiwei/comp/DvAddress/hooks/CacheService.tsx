import React, { createContext, FC } from 'react';
import useCacheService from './useCacheService';

const ServiceContext = createContext<any | null>(null);

const Provider: FC<any> = (props) => {
  const services = useCacheService();
  return (
    <ServiceContext.Provider value={services}>
      {props.children}
    </ServiceContext.Provider>
  );
};

export { Provider, ServiceContext };
