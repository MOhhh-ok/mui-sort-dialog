import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates, useSortable,
    horizontalListSortingStrategy, verticalListSortingStrategy, rectSortingStrategy, rectSwappingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import React, { createContext, CSSProperties, ReactNode, useContext, useEffect, useState } from 'react';
import { DialogProps } from '@toolpad/core';

type Strategy = 'default' | 'horizontal' | 'vertical' | 'swap';

const strategyMap = {
    default: rectSortingStrategy,
    horizontal: horizontalListSortingStrategy,
    vertical: verticalListSortingStrategy,
    swap: rectSwappingStrategy,
}

type InputProps<T> = {
    title?: string;
    items: T[];
    strategy?: Strategy;
    container: (props: { children: ReactNode }) => ReactNode;
    renderItem: (item: T, handlerProps: any) => ReactNode;
}


type OutputProps<T> = {
    items: T[];
}

type SortableItem<T> = {
    id: number;
    item: T;
}


export type MuiSortDialogProps<T> = DialogProps<InputProps<T>, OutputProps<T> | null> & {}

type ContextType<T> = {
    props: MuiSortDialogProps<T>;
    payload: InputProps<T>;
    sortableItems: SortableItem<T>[];
    setSortableItems: React.Dispatch<React.SetStateAction<SortableItem<T>[]>>;
}

const Context = createContext<ContextType<any>>(null!);

export function MuiSortDialog<T>(props: MuiSortDialogProps<T>) {
    const { open, onClose, payload } = props;
    const { title, container } = payload;
    const [sortableItems, setSortableItems] = useState<SortableItem<T>[]>([]);

    useEffect(() => {
        setSortableItems(payload.items.map((item, index) => ({ id: index + 1, item })));
    }, [payload.items, open]);

    return (
        <Dialog open={open ?? false} onClose={() => onClose(null)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Context.Provider value={{ props, payload, sortableItems, setSortableItems }}>
                    <Content />
                </Context.Provider>
            </DialogContent>
        </Dialog>
    );
}

function Content() {
    const { props, sortableItems, setSortableItems, payload } = useContext(Context);
    const { strategy = 'default', container } = payload;
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setSortableItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
    >
        <SortableContext
            items={sortableItems.map(item => item.id)}
            strategy={strategyMap[strategy]}
        >
            {container({ children: sortableItems.map(item => <SortableItemComponent key={item.id} item={item} />) })}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                <Button variant="contained" onClick={() => props.onClose({ items: sortableItems.map(item => item.item) })}>OK</Button>
            </Box>
        </SortableContext>
    </DndContext>
}

export function SortableItemComponent(props: { item: SortableItem<any> }) {
    const { item } = props;
    const { payload } = useContext(Context);
    const { renderItem } = payload;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const elProps = { ref: setNodeRef, style, ...attributes, ...listeners };
    return renderItem(item.item, elProps)
}