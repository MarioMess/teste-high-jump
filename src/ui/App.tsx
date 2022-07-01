import { useState } from 'react';
import * as Componente from './App.styles';
import { Item } from '../types/Item';
import { ListItem } from '../components/ListItem';
import { AddArea } from '../components/AddArea';

const App = () => {
  const [list, setList] = useState<Item[]>([
    { id: 1, name: 'Comprar açucar no mercado', done: false },
    { id: 2, name: 'Comprar café no mercado', done: true },
  ]);

  const handleAddTask = (taskName: string) => {
    let newList = [...list];
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false
    });
    setList(newList);
  }

  const handleTaskChange = (id: number, done: boolean) => {
    let newList = [...list];
    for(let i in newList) {
      if(newList[i].id === id) {
        newList[i].done = done;
      }
    }
    setList(newList);
  }

  return (
    <Componente.Container>
      <Componente.Area>
        <Componente.Header>Lista de Tarefas</Componente.Header>

        <AddArea onEnter={handleAddTask} />

        {list.map((item, index)=>(
          <ListItem
            key={index}
            item={item}
            onChange={handleTaskChange}
          />
        ))}

      </Componente.Area>
    </Componente.Container>
);
}
export default App;
