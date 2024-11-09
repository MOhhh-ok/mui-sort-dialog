import { DialogProps } from '@toolpad/core';
import { ReactNode } from 'react';

type Strategy = 'default' | 'horizontal' | 'vertical' | 'swap';

export type MuiSortDialogRenderDialogActionsProps = {
    onOk: () => void;
    onCancel: () => void;
};

export type MuiSortDialogRenderContainerProps = {
    items: ReactNode;
};

export type MuiSortDialogRenderItemProps<T> = {
    item: T;
    handlerProps: {
        role: string;
        tabIndex: number;
        'aria-disabled': boolean;
        'aria-pressed': boolean | undefined;
        'aria-roledescription': string;
        'aria-describedby': string;
        ref: (node: HTMLElement | null) => void;
        style: React.CSSProperties;
    };
};

export type MuiSortDialogPayload<T> = {
    title?: string;
    items: T[];
    strategy?: Strategy;
    renderContainer?: (props: MuiSortDialogRenderContainerProps) => ReactNode;
    renderItem?: (props: MuiSortDialogRenderItemProps<T>) => ReactNode;
    renderDialogActions?: (
        props: MuiSortDialogRenderDialogActionsProps
    ) => ReactNode;
};

export type MuiSortDialogResult<T> = {
    items: T[];
};

export type MuiSortDialogProps<T> = DialogProps<
    MuiSortDialogPayload<T>,
    MuiSortDialogResult<T> | null
> & {};

export type SortableItem<T> = {
    id: number;
    item: T;
};
