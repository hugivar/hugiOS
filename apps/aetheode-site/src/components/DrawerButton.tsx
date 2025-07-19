import React from 'react';
import { Icon } from 'components/Icon';

export const DrawerButton = () => (
  <button
    className="w-6 dark:text-white flex lg:hidden"
    aria-label="Menu"
    name="Menu"
  >
    <label htmlFor="my-drawer">
      <Icon name="menu" />
    </label>
  </button>
);
