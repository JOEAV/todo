import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTodos,saveTodo,deleteTodo,patchTodo } from "../api/api";
const appInitialState = {
  value: {
    todos: [],
  },
  status: "empty",
};



export const getTodosAsync = createAsyncThunk(
  'app/getTodos',
  async (_,thunkAPI) => {
    try{
      
      
       const todos = await getAllTodos()
       return todos.data.records
    }catch(err){
        return thunkAPI.rejectWithValue(err.message)  
      }
   
  })

  export const saveTodoAsync = createAsyncThunk(
    'app/saveTodo',
    async (todoData,thunkAPI) => {
      try{
       
        
         const savedTodo = await saveTodo(todoData)
         return savedTodo
      }catch(err){
          return thunkAPI.rejectWithValue(err.message)  
        }
     
    })

    export const patchTodoAsync = createAsyncThunk(
        'app/patchTodo',
        async (todoItem,thunkAPI) => {
          try{
            
            const {id,fields} = todoItem
             const patchedTodo = await patchTodo({id,fields})
             return patchedTodo
          }catch(err){
            
              return thunkAPI.rejectWithValue(err.message)  
            }
         
        })
        export const deleteTodoAsync = createAsyncThunk(
            'app/deleteTodo',
            async (todoItemId,thunkAPI) => {
              try{
                
                
                 const res = await deleteTodo(todoItemId)
                 return res
              }catch(err){
                  return thunkAPI.rejectWithValue(err.message)  
                }
             
            })
            
export const AppSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {

},
  extraReducers:(builder) =>{
    builder.addCase(getTodosAsync.fulfilled,((state,{payload})=>{
      state.value.todos = [...payload]
      state.status = 'loaded'
    }))
    .addCase(getTodosAsync.pending,state=> {
      state.status = 'loading'
    })
    .addCase(getTodosAsync.rejected, ((state,{payload})=>{
      console.error('error', payload)
    }))
    .addCase(saveTodoAsync.fulfilled, ((state,{payload})=>{
        const currentState =  [...state.value.todos]
        const newItem = payload.data.records[0]
        state.value.todos = [...currentState,newItem]
      }))
      .addCase(saveTodoAsync.rejected, ((state,{payload})=>{
        console.error('error', payload)
    }))
    .addCase(patchTodoAsync.fulfilled, ((state,{payload})=>{
        const currentState =  [...state.value.todos] 
        const patchedItem = payload.data.records[0]
       const patchedItemIndex = currentState.findIndex(todoItem=>todoItem.id ===patchedItem.id)
        currentState[patchedItemIndex] = patchedItem
        state.value.todos = [...currentState]
      }))
      .addCase(patchTodoAsync.rejected, ((state,{payload})=>{
        console.error('error', payload)
    }))
    .addCase(deleteTodoAsync.fulfilled, ((state,{payload})=>{
        const currentState =  state.value.todos 
        const deletedItemId = payload.data.records[0].id
        const newState = currentState.filter(todoItem => todoItem.id !== deletedItemId)
        state.value.todos = [...newState]
      }))
      .addCase(deleteTodoAsync.rejected, ((state,{payload})=>{
        console.error('error', payload)
    }))
  }
});


export const selectAllTodosData = (state) => state.app.value.todos
export const selectFilteredData = (state,filterTags) => {
  if(filterTags.length){
    return state.app.value.todos.filter(todo=>todo.fields.Tags.some((tagVal)=>filterTags.includes(tagVal)))  
  }else{
    return state.app.value.todos
  }
  
}
export const selectIsLoading = (state) => state.app.status === 'loading'
export default AppSlice.reducer;
