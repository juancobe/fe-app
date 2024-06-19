import styles from './form.module.css'

const Form = (props: React.HTMLProps<HTMLFormElement>) => {
    const {children, ...rest} = props;
    return (
        <form className={styles.container} {...rest}>{children}</form>
    )
}

export default Form