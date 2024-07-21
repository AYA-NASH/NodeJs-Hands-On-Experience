import { Router } from "express";
import { Todo } from "../models/todos";


type RequestBody =  {text: string};
type RequestParams = {todoId: string};
let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({ todos: todos});
});

router.post('/todo', (req, res, next)=>{
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({message: "New TODO added", todo: newTodo, todos: todos});
})

router.put('/todo/:todoId', (req, res, next)=>{
    const body = req.body as RequestBody;
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todo=> todo.id === tid);

    if(todoIndex >= 0){
        todos[todoIndex] = {
            id: tid,
            text: body.text
        };

        return res.status(200).json({message: 'TODO Updated', todos: todos});
    }

    res.status(404).json({message: 'TODO Not Found!'});
})

router.delete('/todo/:todoId', (req, res, next)=>{
    const params = req.params as RequestParams;
    const tid = params.todoId;
    todos = todos.filter(todo=> todo.id !== tid);
    res.status(200).json({message:'TODO Deleted!', todos: todos});
})
export default router;