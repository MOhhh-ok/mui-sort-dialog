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
    horizontalListSortingStrategy,
    rectSortingStrategy, rectSwappingStrategy,
    SortableContext,
    sortableKeyboardCoordinates, useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Context } from './Context.js';
import { RenderContainer, RenderDialogActions, RenderItem } from './defaults.js';
import { MuiSortDialogProps, SortableItem } from './types.js';

const strategyMap = {
    default: rectSortingStrategy,
    horizontal: horizontalListSortingStrategy,
    vertical: verticalListSortingStrategy,
    swap: rectSwappingStrategy,
}

export function MuiSortDialog<T>(props: MuiSortDialogProps<T>) {
    const { open, onClose, payload } = props;
    const { title, renderDialogActions = RenderDialogActions } = payload;
    const [sortableItems, setSortableItems] = useState<SortableItem<T>[]>([]);

    useEffect(() => {
        setSortableItems(payload.items.map((item, index) => ({ id: index + 1, item })));
    }, [payload.items, open]);

    return (
        <Dialog open={open ?? false} onClose={() => onClose(null)}>
            <Context.Provider value={{ props, payload, sortableItems, setSortableItems }}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Content />
                </DialogContent>
                <DialogActions>
                    <Actions />
                </DialogActions>
            </Context.Provider>
        </Dialog>
    );
}

function Content() {
    const { props, sortableItems, setSortableItems, payload } = useContext(Context);
    const { strategy = 'default', renderContainer = RenderContainer, renderDialogActions = RenderDialogActions } = payload;
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
            {renderContainer({ items: sortableItems.map(item => <SortableItemComponent key={item.id} item={item} />) })}
        </SortableContext>
    </DndContext>
}

function SortableItemComponent(props: { item: SortableItem<any> }) {
    const { item } = props;
    const { payload } = useContext(Context);
    const { renderItem = RenderItem } = payload;
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
    return renderItem({ item: item.item, handlerProps: elProps })
}

function Actions() {
    const { payload, sortableItems, props } = useContext(Context);
    const { onClose } = props;
    const { renderDialogActions = RenderDialogActions } = payload;

    return renderDialogActions({
        onOk: () => onClose({ items: sortableItems?.map(item => item.item) }),
        onCancel: () => onClose(null)
    });
}