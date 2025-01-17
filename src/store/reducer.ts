import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS
} from './actions';

// Local storage for todos
const lsTodos: any = window.localStorage.getItem("todolist");

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(lsTodos) || []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
//  Fixed creat to do
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
// Added feature UPDATE_TODO
    case UPDATE_TODO:
      const indexz = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[indexz].content = action.payload.content;
      return {
        ...state,
      }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1,1);
      return {
        ...state,
        todos: state.todos
      }


    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;