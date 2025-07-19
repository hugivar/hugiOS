/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ThemeContext } from 'components/ThemeProvider';
import classNames from 'classnames';

const ThemeMenu = ({ theme }: any) => {
  const hasTheme =
    typeof window !== 'undefined' && window.localStorage && theme;

  return (
    <Menu.Button name="Set your theme" aria-label="Set your theme">
      <img
        height="20"
        width="20"
        alt="current theme icon"
        src={
          hasTheme && theme === 'dark'
            ? '/icons/darkmode.svg'
            : '/icons/lightmode.svg'
        }
      />
    </Menu.Button>
  );
};

export const ThemeSwitch = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <Menu as="div" className="relative inline-block text-left float-right">
      <div>
        <ThemeMenu theme={theme} />
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <button
                name="light theme"
                onClick={() => setTheme('light')}
                className={classNames(
                  theme === 'light'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700',
                  'block px-4 py-2 text-sm w-full text-left flex flex-row'
                )}
              >
                <img
                  height="16"
                  width="16"
                  src="/icons/lightmode.svg"
                  alt="light mode icon"
                />
                <div className="ml-2">Light</div>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                name="dark theme"
                onClick={() => setTheme('dark')}
                className={classNames(
                  theme === 'dark'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700',
                  'block px-4 py-2 text-sm w-full text-left flex flex-row'
                )}
              >
                <img
                  height="16"
                  width="16"
                  src="/icons/darkmode.svg"
                  alt="dark mode icon"
                />
                <div className="ml-2">Dark</div>
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                name="system theme"
                onClick={() => {
                  setTheme('system');
                }}
                className={classNames(
                  theme === 'system'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700',
                  'block px-4 py-2 text-sm w-full text-left flex flex-row'
                )}
              >
                <img
                  height="16"
                  width="16"
                  src="/icons/system.svg"
                  alt="system icon"
                />
                <div className="ml-2">System</div>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
