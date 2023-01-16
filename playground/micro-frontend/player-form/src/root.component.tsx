import React from "react";
import { ReactPlayer } from '@player-ui/react';
import { ReferenceAssetsPlugin } from '@player-ui/reference-assets-plugin-react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import { AssetProviderPlugin } from '@player-ui/asset-provider-plugin-react';

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
    components: {
        Button,
    },
})


// create a new web-player instance
const reactPlayer = new ReactPlayer({
    plugins: [
        new ReferenceAssetsPlugin(),
        new AssetProviderPlugin([
            ['custom-asset', () => <div>Hello World!</div>],
            ['custom', () => <div>Other Custom Asset</div>],
        ])
    ],
});

const content =
{
    "id": "action-navigation-flow",
    "views": [
        {
            "id": "view-1",
            "type": "collection",
            "label": {
                "asset": {
                    "id": "title",
                    "type": "text",
                    "value": "View 1"
                }
            },
            "values": [
                {
                    "asset": {
                        "id": "action-prev",
                        "type": "custom",
                        "value": "Prev",
                        "label": {
                            "asset": {
                                "id": "action-prev-id",
                                "type": "text",
                                "value": "Go Back"
                            }
                        }
                    }
                },
                {
                    "asset": {
                        "id": "action-next",
                        "type": "action",
                        "value": "Next",
                        "label": {
                            "asset": {
                                "id": "action-next-id",
                                "type": "text",
                                "value": "Next"
                            }
                        }
                    }
                }
            ]
        },
        {
            "id": "view-2",
            "type": "collection",
            "label": {
                "asset": {
                    "id": "title",
                    "type": "text",
                    "value": "View 2"
                }
            },
            "values": [
                {
                    "asset": {
                        "id": "action-prev",
                        "type": "custom",
                        "value": "Prev",
                        "label": {
                            "asset": {
                                "id": "action-prev-id",
                                "type": "text",
                                "value": "Go Back"
                            }
                        }
                    }
                },
                {
                    "asset": {
                        "id": "action-next",
                        "type": "action",
                        "value": "Next",
                        "label": {
                            "asset": {
                                "id": "action-next-id",
                                "type": "text",
                                "value": "End"
                            }
                        }
                    }
                }
            ]
        }
    ],
    "navigation": {
        "BEGIN": "FLOW_1",
        "FLOW_1": {
            "startState": "VIEW_1",
            "VIEW_1": {
                "state_type": "VIEW",
                "ref": "view-1",
                "transitions": {
                    "Next": "VIEW_2",
                    "Prev": "END"
                }
            },
            "VIEW_2": {
                "state_type": "VIEW",
                "ref": "view-2",
                "transitions": {
                    "Next": "END",
                    "Prev": "VIEW_1"
                }
            },
            "END": {
                "state_type": "END",
                "outcome": "done"
            }
        }
    },
    "data": {}
}


reactPlayer.start(content);

export default function Root(props) {
    return (
        <ChakraBaseProvider theme={theme}>
            <reactPlayer.Component />
        </ChakraBaseProvider>
    );
}