import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";

import { Button } from "components/Button";
import settings from "config/settings";
import { determineIPFS } from "utils/routing";
import Tooltip from "./Tooltip";

export const IPFSSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const ipfsEnabled = determineIPFS();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {ipfsEnabled ? (
        <Tooltip message="Turn of IPFS">
          <Button
            name="Turn off IPFS"
            onClick={() => {
              window.location.hostname = settings.siteAddress;
            }}
          >
            <Image
              unoptimized
              height="24"
              width="24"
              src="/icons/ipfs-enabled.svg"
              alt="ipfs enabled icon"
            />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip message="Turn on IPFS">
          <Button
            name="Turn on IPFS"
            onClick={() => {
              window.location.hostname = settings.siteIPFSAddress;
            }}
            className="invert-0 dark:invert"
          >
            <Image
              unoptimized
              height="24"
              width="24"
              src="/icons/ipfs.svg"
              alt="ipfs disabled icon"
            />
          </Button>
        </Tooltip>
      )}
    </>
  );
};
