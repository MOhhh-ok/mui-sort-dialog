"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortableItemComponent = exports.MuiSortDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@dnd-kit/core");
const sortable_1 = require("@dnd-kit/sortable");
const utilities_1 = require("@dnd-kit/utilities");
const material_1 = require("@mui/material");
const react_1 = require("react");
const Context = (0, react_1.createContext)(null);
function MuiSortDialog(props) {
    const { open, onClose, payload } = props;
    const { title, container } = payload;
    const [sortableItems, setSortableItems] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setSortableItems(payload.items.map((item, index) => ({ id: index + 1, item })));
    }, [payload.items, open]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: open !== null && open !== void 0 ? open : false, onClose: () => onClose(null), children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: title }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(Context.Provider, { value: { props, payload, sortableItems, setSortableItems }, children: (0, jsx_runtime_1.jsx)(Content, {}) }) })] }));
}
exports.MuiSortDialog = MuiSortDialog;
function Content() {
    const { props, sortableItems, setSortableItems, payload } = (0, react_1.useContext)(Context);
    const { strategy, container } = payload;
    const sensors = (0, core_1.useSensors)((0, core_1.useSensor)(core_1.PointerSensor), (0, core_1.useSensor)(core_1.KeyboardSensor, {
        coordinateGetter: sortable_1.sortableKeyboardCoordinates,
    }));
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
            setSortableItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === (over === null || over === void 0 ? void 0 : over.id));
                return (0, sortable_1.arrayMove)(items, oldIndex, newIndex);
            });
        }
    };
    return (0, jsx_runtime_1.jsx)(core_1.DndContext, { sensors: sensors, collisionDetection: core_1.closestCenter, onDragEnd: handleDragEnd, children: (0, jsx_runtime_1.jsxs)(sortable_1.SortableContext, { items: sortableItems.map(item => item.id), strategy: strategy === 'horizontal' ? sortable_1.horizontalListSortingStrategy : sortable_1.verticalListSortingStrategy, children: [container({ children: sortableItems.map(item => (0, jsx_runtime_1.jsx)(SortableItemComponent, { item: item }, item.id)) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { display: "flex", justifyContent: "center", mt: 2, mb: 2 }, children: (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", onClick: () => props.onClose({ items: sortableItems.map(item => item.item) }), children: "OK" }) })] }) });
}
function SortableItemComponent(props) {
    const { item } = props;
    const { payload } = (0, react_1.useContext)(Context);
    const { renderItem } = payload;
    const { attributes, listeners, setNodeRef, transform, transition, } = (0, sortable_1.useSortable)({ id: item.id });
    const style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition,
    };
    const elProps = Object.assign(Object.assign({ ref: setNodeRef, style }, attributes), listeners);
    return renderItem(item.item, elProps);
}
exports.SortableItemComponent = SortableItemComponent;
//# sourceMappingURL=MuiSortDialog.js.map