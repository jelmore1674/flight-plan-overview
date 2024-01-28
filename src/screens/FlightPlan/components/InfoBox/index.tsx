import styles from "./styles.module.css";

interface Props {
  label: string;
  text: string;
  unit?: string;
}

export function InfoBox({ label, text, unit }: Props) {
    return (
  <div
    style={{
      border: "1px solid black",
      padding: 16,
      minWidth: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <h3>{label}</h3>
    <h4>
      {text} {unit}
    </h4>
  </div>
)
};
