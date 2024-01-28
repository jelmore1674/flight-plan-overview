import styles from "./styles.module.css";

type Props = {
  label: string;
  value: number | string;
};

export const Output = ({ label, value }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2>{label}</h2>
      <h2>{value}</h2>
    </div>
  );
};
