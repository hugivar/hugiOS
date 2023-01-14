import React from "react";

export default function Root(props) {
    return (
        <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
            <div className="flex items-center justify-between">
                <a
                    href="https://github.com/react-microfrontends"
                    className="externalLink"
                >
                    Github project
                </a>
            </div>
        </div>
    );
}