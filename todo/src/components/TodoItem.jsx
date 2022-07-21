import { Paper, Stack, Group, Text, ActionIcon, Badge } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { useMemo, memo, useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteTodoAsync, patchTodoAsync } from "../pages/AppSlice";
import AddInputComp from "../components/AddInputComp";
import { CheckBoxComp } from "../components/CheckboxComp";
function TodoItem(props) {
  const dispatch = useAppDispatch();
  const DELIMETER = " ";

  const { description, isDone, tags, id } = props;

  const onTagsAdded = useCallback(
    (inputValue) => {
      const set = new Set();
      const newTags = inputValue.split(DELIMETER).filter(word=>word!=='');
      tags.forEach((tag) => set.add(tag));

      newTags.forEach((tag) => set.add(tag));
      const newUniqueTagsArr = Array.from(set);
      const difference = newUniqueTagsArr.filter(x=>!tags.includes(x))
      if(difference.length){
        dispatch(patchTodoAsync({ id, fields: { Tags: newUniqueTagsArr } }));
      }
      
    },
    [tags, dispatch, id]
  );
  const tagsItems = useMemo(() => {
    return tags.map((tag, index) => {
      return <Badge key={`${tag}${id}`}>{tag}</Badge>;
    });
  }, [tags, id]);
  const onStatusChanged = useCallback(
    (checkedStatus) => {
      dispatch(
        patchTodoAsync({
          id,
          fields: { Status: checkedStatus ? `Done` : "Todo" },
        })
      );
    },
    [dispatch, id]
  );
  const deleteTodo = useCallback(() => {
    dispatch(deleteTodoAsync(id));
  }, [id, dispatch]);

  return (
    <Paper
      sx={{
        width: "75%",
        height: "150px",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <Stack>
        <Group sx={{ justifyContent: "space-around" }} position={"center"}>
          <CheckBoxComp
            checkedStatus={isDone}
            onStatusChanged={onStatusChanged}
          />
          <Text weight={700}>{description}</Text>
          <ActionIcon onClick={deleteTodo}>
            <Trash />
          </ActionIcon>
        </Group>
        <Group position="center">{tagsItems}</Group>
        <Group position="center">
          <AddInputComp
            width={"50%"}
            addHandler={onTagsAdded}
            placeholder="add new tags.store on enter"
          />
        </Group>
      </Stack>
    </Paper>
  );
}
const arePropsEqual = (prevProps, nextProps) => {
  if (prevProps.tags.length !== nextProps.tags.length) {
    return false;
  } else {
    return true;
  }
};
export default memo(TodoItem,arePropsEqual);
