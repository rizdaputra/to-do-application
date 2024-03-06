'use client'
import { useEffect, useState } from "react";

import { ToDoItem } from "./types/ToDoItem";
import ToDoListItem from "./components/ToDoListItems/ToDoListItem";
import ProgressCard from "./components/ProgressCard/ProgressCard";
import InputWithButton from "./components/InputWithButton/InputWithButton";
import { getToDoItems, updateToDoCheck, createToDo, deleteToDo } from "./api/ToDoItems";
import DropdownFilter from "./components/DropdownFilter/DropdownFilter";

export default function Home() {
  const [toDoListItems, setToDoListItems] = useState<ToDoItem[]>([]);
  const [shownToDoListItems, setShownToDoListItems] = useState<ToDoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string>("All")

  useEffect(()=> {
    setIsLoading(true);
    const fetchData = async () => {
      const toDoItems = await getToDoItems();
      setToDoListItems(toDoItems);
      setShownToDoListItems(toDoItems);
      setIsLoading(false);
    }
    fetchData()
  }, [])

  const checkboxClick = (toDoId: string) => {
    let updatedToDoListItems = [...toDoListItems];
    const itemToUpdateIdx = updatedToDoListItems.findIndex((item) => item._id === toDoId);
    updatedToDoListItems[itemToUpdateIdx].isDone = !updatedToDoListItems[itemToUpdateIdx].isDone; 
    updateToDoCheck(toDoId);
    setToDoListItems(updatedToDoListItems);
  }

  const countProgress = (tasks: ToDoItem[]) => {
    const totalTasks = tasks.length;
    let doneTasks = 0;

    tasks.forEach((task) => {
      if (task.isDone) doneTasks++;
    })

    return {
      totalTasks,
      doneTasks
    }
  }

  const refetchData = async () => {
    const toDoItems = await getToDoItems();
    setToDoListItems(toDoItems);
    changeFilter(currentFilter, toDoItems);
    setIsLoading(false);
  }

  const addToDo = async (text: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createToDo(text);
    refetchData();
  }
 
  const deleteToDoItem = async (id: string) => {
    setIsLoading(true);
    await deleteToDo(id);
    refetchData();
  }

  const changeFilter = (filter: string, items: ToDoItem[]) => {
    let updatedItemsTemp = [...items];
    let updatedCurrentItems: ToDoItem[] = [];

    if(filter === "All") {
      updatedCurrentItems = updatedItemsTemp;
    } else if (filter === "Done") {
      updatedCurrentItems = updatedItemsTemp.filter(item => item.isDone);
    } else if (filter === "Undone") {
      updatedCurrentItems = updatedItemsTemp.filter(item => !item.isDone);
    }

    setCurrentFilter(filter);
    setShownToDoListItems(updatedCurrentItems);
  }

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="main-card">
        <ProgressCard progressData={countProgress(toDoListItems)}/>
        <div className="flex justify-between mb-4 items-center">
          <h2 className="text-2xl font-medium">To-dos</h2>
          <DropdownFilter currentFilter={currentFilter} changeFilter={changeFilter} toDoItems={toDoListItems}/>
        </div>
        <InputWithButton onAdd={addToDo} isLoading={isLoading}/> 
        {isLoading ? <div>Loading ...</div> : shownToDoListItems.map((item) => {
          return <ToDoListItem toDoItem={item} checkboxClick={checkboxClick} deleteToDoItem={deleteToDoItem} key={item._id}/>
        })}
      </div>
    </main>
  );
}
