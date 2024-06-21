import classNames from "classnames"
import styles from "./styles.module.css"
/**
 *
 * @param totalAmount: total in the account
 */
const TotalInAccount = ({
  totalAmount,
  threshold,
}: {
  totalAmount: number
  threshold: number
}) => {
  return (
    <div>
      Total in your bank account:{" "}
      <span
        className={classNames({
          [styles.green]: threshold < totalAmount,
          [styles.yellow]: totalAmount <= threshold && totalAmount > 0,
          [styles.red]: totalAmount <= 0,
        })}
        data-testid="total-in-account"
      >
        {totalAmount}
      </span>
    </div>
  )
}

export default TotalInAccount
