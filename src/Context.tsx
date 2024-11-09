import { createContext } from "react";
import { MuiSortDialogProps, MuiSortDialogPayload, SortableItem } from "./types.js";

export type ContextType<T> = {
    props: MuiSortDialogProps<T>;
    payload: MuiSortDialogPayload<T>;
    sortableItems: SortableItem<T>[];
    setSortableItems: React.Dispatch<React.SetStateAction<SortableItem<T>[]>>;
}

export const Context = createContext<ContextType<any>>(null!);
