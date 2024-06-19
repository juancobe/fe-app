import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./formField.module.css";

interface FormFieldProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    labelText: string,
    id: string
}

const FormField = (props: FormFieldProps) => {
    const { id, labelText, ...rest } = props
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={props.id}>{labelText}</label>
            <input id={props.id} aria-label={props.id} {...rest} />
        </div>
    )
}

export default FormField