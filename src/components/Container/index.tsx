import { ReactElement } from "react";
import styles from "./styles.module.css";

type Props = {
  children: ReactElement;
};

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
