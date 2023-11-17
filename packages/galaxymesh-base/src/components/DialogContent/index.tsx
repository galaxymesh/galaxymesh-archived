import { DialogContent as MuiDialogContent, DialogContentProps as MuiDialogContentProps } from '@mui/material';

export function DialogContent(props: MuiDialogContentProps): JSX.Element {
    return (
        <MuiDialogContent {...props} />
    )
}

export default DialogContent;