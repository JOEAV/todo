import { Stack, Container, Paper,Text } from "@mantine/core";
import { useState, useMemo, useCallback, useEffect } from "react";
import FilterComp from "../components/FilterComp";
import TodoItem from "../components/TodoItem";
import { selectFilteredData, saveTodoAsync, getTodosAsync,selectIsLoading } from "./AppSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import AddInputComp from "../components/AddInputComp";

export function HomePage() {
  const dispatch = useAppDispatch();
  const [filteredTags, setFilteredTags] = useState([]);
  const filteredTodos = useAppSelector((state) =>
    selectFilteredData(state, filteredTags)
  );
  const isLoading = useAppSelector(selectIsLoading)

  const filteredItems = useMemo(() => {
    if (filteredTodos.length) {
      return filteredTodos.map((item,index) => {
        const { Text: description, Status: status, Tags: tags } = item.fields;
        const id = item.id;
        return (
          <TodoItem
            key={id}
            description={description}
            isDone={status === "Done"}
            tags={tags}
            id={id}
          />
        );
      });
    } else {
      return null;
    }
  },[filteredTodos]);
  const addTodoHandler = useCallback(
    (text) => {
      dispatch(saveTodoAsync({ text }));
    },
    [dispatch]
  );
  const onFilterTagsChanged = useCallback((newFilterTags) => {
    setFilteredTags(newFilterTags);
  }, []);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  return (
    <Container>
      <Paper mt={200}>
        <Stack align={"center"}>
          <FilterComp onFilterTagsChanged={onFilterTagsChanged} />
          {isLoading ? <Text weight={700}>Loading...</Text> :filteredItems!==null ? filteredItems : <Text>Todo list is empty...</Text>}
          <AddInputComp
            addHandler={addTodoHandler}
            placeholder="Add new task. store on enter"
          />
        </Stack>
      </Paper>
    </Container>
  );
}
