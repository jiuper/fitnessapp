import type { BackendFactory } from "dnd-core";

declare module "*.avif" {
    const src: string;
    export default src;
}

declare module "*.bmp" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.mp4" {
    const src: string;
    export default src;
}

declare module "*.gif" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    import type * as React from "react";

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}
export type { HTML5BackendContext, HTML5BackendOptions } from "./types.js";
export declare const HTML5Backend: BackendFactory;
