/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, Fragment } from 'react';

interface IIcon {
  name: string | JSX.Element;
  className?: string;
}

const getIcon = async (name, setIcon) => {
  const importedIcon = await import(`../../public/icons/${name}.svg`);

  setIcon(importedIcon.default);
};

export const Icon = ({ name }: IIcon): any => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    getIcon(name, setIcon);
  }, []);

  return icon ? icon : <Fragment />;
};
