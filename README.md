# Mui Sort Dialog

This is a dialog for sort items.

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
import { DialogsProvider, useDialogs } from '@toolpad/core'
import { MuiSortDialog } from '@masa-dev/mui-sort-dialog'

type ItemType = {
    name: string;
    age: number;
}

const testItems: ItemType[] = [
    { name: 'aaa', age: 10 },
    { name: 'bbb', age: 20 },
    { name: 'ccc', age: 30 },
]

function App() {
    return <DialogsProvider>
        <AppInner />
    </DialogsProvider>
}

function AppInner() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const res = await dlgs.open(MuiSortDialog<ItemType>, {
            items: testItems,
            container: (props) => <div style={{ display: 'flex', gap: 3, overflowX: 'scroll' }}>{props.children}</div>,
            renderItem: (item, handlerProps) => <div {...handlerProps}>{item.name}:{item.age}</div>
        })
        dlgs.alert(JSON.stringify(res))
    };

    return (
        <>
            <button onClick={handleClick}>click</button>
        </>
    )
}
```