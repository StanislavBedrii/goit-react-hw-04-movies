import styles from './ErrorText.module.css';

function ErrorText({ text }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.errorText}>{text}</p>
    </div>
  );
}

export default ErrorText;
