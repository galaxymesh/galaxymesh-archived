import { DialogTitle as MuiDialogTitle, DialogTitleProps as MuiDialogTitleProps } from "@mui/material";

export function DialogTitle(props: MuiDialogTitleProps): JSX.Element {
    return (
        <MuiDialogTitle {...props} />
    )
}

export default DialogTitle;