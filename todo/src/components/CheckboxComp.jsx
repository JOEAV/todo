import { useState, useCallback } from "react";
import { Checkbox } from "@mantine/core";
export function CheckBoxComp(props) {
  const { checkedStatus, onStatusChanged } = props;
  const [checked, setChecked] = useState(checkedStatus);
  const onStatusChangedHandler = useCallback(
    (event) => {
      const checkedVal = event.currentTarget.checked;
      onStatusChanged(checkedVal);
      setChecked((val) => !val);
    },
    [onStatusChanged]
  );
  return (
    <Checkbox
      label="Done Status"
      checked={checked}
      onChange={onStatusChangedHandler}
    />
  );
}
