import styles from "./styles.module.css";

interface Props {
  label: string;
  text: string;
  unit?: string;
  temp?: boolean;
}

export function InfoBox({ label, text, unit, temp }: Props) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading} style={{ margin: 0 }}>
        {label}
      </h3>
      <h4
        style={{ margin: 0 }}
        className={styles.text}
      >{`${text}${unit ? (temp ? unit : ` ${unit}`) : ""}`}</h4>
    </div>
  );
}
