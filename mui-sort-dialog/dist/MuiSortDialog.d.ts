import React, { ReactNode } from 'react';
import { DialogProps } from '@toolpad/core';
type InputProps<T> = {
    title?: string;
    items: T[];
    strategy: 'horizontal' | 'vertical';
    container: (props: {
        children: ReactNode;
    }) => ReactNode;
    renderItem: (item: T, handlerProps: any) => ReactNode;
};
type OutputProps<T> = {
    items: T[];
};
type SortableItem<T> = {
    id: number;
    item: T;
};
export type MuiSortDialogProps<T> = DialogProps<InputProps<T>, OutputProps<T> | null> & {};
export declare function MuiSortDialog<T>(props: MuiSortDialogProps<T>): import("react/jsx-runtime").JSX.Element;
export declare function SortableItemComponent(props: {
    item: SortableItem<any>;
}): React.ReactNode;
export {};
