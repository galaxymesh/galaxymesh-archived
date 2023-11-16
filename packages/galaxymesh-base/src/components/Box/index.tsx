import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material';

export function Box(props: MuiBoxProps): JSX.Element {
    return (
        <MuiBox {...props} />
    )
}

export default Box;