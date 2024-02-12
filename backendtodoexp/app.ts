import express, { Request, Response } from 'express';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const todos = [{id:1,task:"go gym",completed:false},{id:2,task:"writing code",completed:true}]

const app = express();

app.use(express.json());      

app.get('/', (req: Request, res: Response) => {
    
    res.send(todos);
});
app.post('/newtodos', (req: Request, res: Response) => {

    const { task } = req.body;

    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodo: Todo = { id, task, completed: false };

    todos.push(newTodo);

    console.log("New todo added:", newTodo);

    res.send(newTodo);
});

app.delete('/removetodo', (req: Request, res: Response) => {
    
    const removedTodo = todos.pop()
    res.send(removedTodo)
});

app.put('/changedtodos/:id', (req: Request, res: Response) => {
    
    const id = parseInt(req.params.id);
    const { task, completed } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === id);
    todos[todoIndex].task = task;
    todos[todoIndex].completed = completed;
    res.send(todos[todoIndex]);
});

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
    
    
});
