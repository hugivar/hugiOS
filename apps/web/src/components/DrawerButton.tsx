import React from "react";
import { Icon } from "components/Icon";
import { Button } from "components/Button";

export const DrawerButton = () => (
  <Button
    className="w-6 dark:text-white flex lg:hidden"
    aria-label="Menu"
    name="Menu"
  >
    <label htmlFor="my-drawer">
      <Icon name="menu" height="24" width="24" />
    </label>
  </Button>
);
