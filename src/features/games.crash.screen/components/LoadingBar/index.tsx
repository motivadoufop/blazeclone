import { statusStore } from "features/games.crash.screen/stores/status.store";
import { observer } from "mobx-react-lite";
import { useEffect, useState, type ReactElement } from "react";
import styles from "./styles.module.scss";

export const LoadingBar = observer((): ReactElement => {
  const [timer, setTimer] = useState<number>(6.0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0.01) setTimer(timer - 0.0125);
      else {
        setTimer(0);
        clearInterval(interval);

        statusStore.setIsLoading(false);
      }
    }, 10);

    return (): void => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className={styles.container}>
      <div className={styles.progress_bar}>
        <span className={styles.label}>Começando em {timer.toFixed(1)}s</span>
      </div>
    </div>
  );
});
