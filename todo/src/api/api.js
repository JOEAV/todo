import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Api-Key"] =
  "DD2cgT1gqo31G0rd0UCar5h2CGM3Z9Oa51ZG2uKe";

export async function getAllTodos() {
  return axios.get(
    `https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos/`
  );
}
export async function saveTodo(todoData) {
  const { text } = todoData;
  const itemToSave = {
    records: [
      {
        fields: {
          Status: "Todo",
          Tags: [],
          Text: text,
        },
      },
    ],
  };
  const itemSerialized = JSON.stringify(itemToSave);

  return axios.post(
    "https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos",
    itemSerialized
  );
}

export async function patchTodo(todoItem) {
  const { id, fields } = todoItem;
  const itemToSave = {
    records: [
      {
        id: id,
        fields: fields,
      },
    ],
  };
  const itemSerialized = JSON.stringify(itemToSave);
  return axios.patch(
    "https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos",
    itemSerialized
  );
}

export async function deleteTodo(todoItemId) {
  return axios.delete(
    `https://tyn2p16cy2.execute-api.eu-west-1.amazonaws.com/prod/todos?records[]=${todoItemId}`
  );
}
