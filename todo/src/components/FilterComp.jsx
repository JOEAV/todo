import { TextInput } from "@mantine/core";
import { useState, useCallback } from "react";
import { memo } from "react";
function FilterComp(props) {
  const { onFilterTagsChanged } = props;
  const DELIMETER = " ";
  const [draftTagsValue, setDraftTagsValue] = useState("");
  const onFilterChanged = useCallback(
    (event) => {
      setDraftTagsValue(event.target.value);
      const newSearchTags = event.target.value
        .split(DELIMETER)
        .filter((word) => word !== "");
      if (newSearchTags.length && event.target.value.slice(-1) !== DELIMETER) {
        const set = new Set();
        newSearchTags.forEach((tag) => set.add(tag));
        const newUniqueSearchTagsArr = Array.from(set);
        onFilterTagsChanged(newUniqueSearchTagsArr);
      } else if (!event.target.value.replace(/ /g, "").length) {
        setDraftTagsValue("");
        onFilterTagsChanged([]);
      }
    },
    [onFilterTagsChanged]
  );

  return (
    <TextInput
      sx={{ width: "75%" }}
      placeholder="Filter by tags"
      size={"md"}
      value={draftTagsValue}
      onChange={onFilterChanged}
    />
  );
}

export default memo(FilterComp);
