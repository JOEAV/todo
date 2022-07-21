import { TextInput } from "@mantine/core";
import { useState, useCallback } from "react";
import { memo } from "react";
function AddInputComp(props) {
  const { addHandler, placeholder, width = "75%" } = props;
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (inputValue !== "" && inputValue.replace(/ /g, "").length) {
          addHandler(inputValue);
          setInputValue("");
        }
      }
    },
    [addHandler, inputValue]
  );
  const handleChange = useCallback((event) => {
    setInputValue(event.currentTarget.value);
  }, []);
  return (
    <TextInput
      sx={{ width: width }}
      placeholder={placeholder}
      size={"md"}
      value={inputValue}
      onChange={handleChange}
      onKeyUp={handleKeyPress}
    />
  );
}
export default memo(AddInputComp);
