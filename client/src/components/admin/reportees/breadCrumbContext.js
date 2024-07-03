import React, { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbStack, setBreadcrumbStack] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbStack, setBreadcrumbStack }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => useContext(BreadcrumbContext);
