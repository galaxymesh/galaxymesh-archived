import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export function Button(props: MuiButtonProps): JSX.Element {
    return <MuiButton {...props} />
};

export default Button;