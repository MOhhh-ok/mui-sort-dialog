import { Box, Button } from "@mui/material";
import { MuiSortDialogRenderContainerProps, MuiSortDialogRenderDialogActionsProps, MuiSortDialogRenderItemProps } from "./types.js";
import { CSSProperties, Fragment } from "react";

export function RenderContainer<T>(props: MuiSortDialogRenderContainerProps) {
    return <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {props.items}
    </Box>;
}

export function RenderItem<T>(props: MuiSortDialogRenderItemProps<T>) {
    const style: CSSProperties = { padding: "0.5em 1em", border: "1px solid #aaa", borderRadius: 1, ...props.handlerProps.style };
    return <div {...props.handlerProps} style={style} >
        <dl>
            {Object.entries(props.item).map(([key, value]) => <Fragment key={key}>
                <dt>{key}</dt>
                <dd>{JSON.stringify(value)}</dd>
            </Fragment>)}
        </dl>
    </div>;
}

export function RenderDialogActions(props: MuiSortDialogRenderDialogActionsProps) {
    return <>
        <Button variant="outlined" onClick={props.onCancel}>Cancel</Button>
        <Button variant="contained" onClick={props.onOk}>OK</Button>
    </>;
}