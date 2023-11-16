import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material';

export function Paper(props: MuiPaperProps): JSX.Element {
    return <MuiPaper {...props} />
}

export default Paper;