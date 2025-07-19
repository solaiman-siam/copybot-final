import type { ReactNode } from "react";


export type TContainerProps = {
    children: ReactNode;
}


export type TCommonBtnProps = {
    className: string,
    children: ReactNode
    value?: boolean 
}