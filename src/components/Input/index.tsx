import styles from "./styles.module.css";

type Props = {
  label: string;
  value: number | string;
  onChange: (val: string | number) => void;
  type: "number" | "text";
};

export const Input = ({ label, value, onChange, type }: Props) => {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input
        type={type}
        onChange={({ currentTarget }) => {
          onChange(
            isNaN(currentTarget.valueAsNumber)
              ? currentTarget.value
              : currentTarget.valueAsNumber
          );
        }}
        value={value}
      />
    </div>
  );
};
