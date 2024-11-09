# Mui Sort Dialog

This is a dialog for sort items.

Try demo at https://mohhh-ok.github.io/mui-sort-dialog-demo/dist/

# Install

```
npm i @masa-dev/mui-sort-dialog
```

If you do not have Mui yet. run below.

```
npm i @mui/material @emotion/react @emotion/styled
```

And also need toolpad. That is a part of Mui.

```
npm i @toolpad/core
```

# Usage

```tsx
import { MuiSortDialog, MuiSortDialogPayload, MuiSortDialogRenderContainerProps, MuiSortDialogRenderDialogActionsProps, MuiSortDialogRenderItemProps } from '@masa-dev/mui-sort-dialog';
import { DialogsProvider, useDialogs } from '@toolpad/core';

type ItemType = {
    name: string;
    age: number;
}

const items: ItemType[] = [
    { name: 'aaa', age: 10 },
    { name: 'bbb', age: 20 },
    { name: 'ccc', age: 30 },
]

function App() {
    return <DialogsProvider>
        <div style={{ display: 'flex', gap: 3 }}>
            <Minimum />
            <WithRenderItem />
            <WithRenderContainer />
            <WithRenderActions />
        </div>
    </DialogsProvider>
}

function Minimum() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const payload: MuiSortDialogPayload<ItemType> = { items }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>Minimum</button>
}

function WithRenderItem() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const renderItem = (props: MuiSortDialogRenderItemProps<ItemType>) => <div {...props.handlerProps} style={{ border: "1px solid #aaa", ...props.handlerProps.style }}>
            {props.item.name}:{props.item.age}
        </div>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderItem }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Item</button>
}

function WithRenderContainer() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const renderContainer = (props: MuiSortDialogRenderContainerProps) => <div style={{ display: 'flex', flexDirection: "column", gap: 3 }}>{props.items}</div>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderContainer }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Container</button>
}

function WithRenderActions() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const renderDialogActions = (props: MuiSortDialogRenderDialogActionsProps) => <div>
            <button onClick={props.onCancel} style={{ background: "red" }}>Cancel</button>
            <button onClick={props.onOk} style={{ background: "blue" }}>OK</button>
        </div>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderDialogActions }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Actions</button>
}

export default App
```