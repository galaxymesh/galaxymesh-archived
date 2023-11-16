import { Popper as MuiPopper, PopperProps as MuiPopperProps } from '@mui/material';

export function Popper(props: MuiPopperProps): JSX.Element {
    return <MuiPopper {...props} />
}

export default Popper;