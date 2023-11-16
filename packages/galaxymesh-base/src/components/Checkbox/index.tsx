import { Checkbox as MuiCheckbox, type CheckboxProps as MuiCheckboxProps } from '@mui/material';

export function Checkbox(props: MuiCheckboxProps): JSX.Element {
    return <MuiCheckbox {...props} />
}

export default Checkbox;