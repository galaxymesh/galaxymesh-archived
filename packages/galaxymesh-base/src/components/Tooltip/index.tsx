import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';

export function Tooltip(props: MuiTooltipProps): JSX.Element {
    return <MuiTooltip {...props} />
}

export default Tooltip;