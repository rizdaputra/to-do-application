import { useState } from "react"

import { ToDoItem } from "@/app/types/ToDoItem"
import "./ToDoListItem.css"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"

interface ToDoListItemProps {
    toDoItem: ToDoItem,
    checkboxClick: Function,
    deleteToDoItem: Function
}

const ToDoListItem = ({toDoItem, checkboxClick, deleteToDoItem} : ToDoListItemProps) => {
    const [isShowingDelete, setIsShowingDelete] = useState<boolean>(false);
    const ref = useOutsideClick(() => onThreedotsClick(false))

    const onThreedotsClick = (threedotsclicked:boolean) => {
        setIsShowingDelete(threedotsclicked);
    }

    return <div key={toDoItem._id} className="to-do-item-wrapper">
        <label className="checkbox-container">
            <span className={toDoItem.isDone ? "to-do-item-checked" : ""}>{toDoItem.text}</span>
            <input type="checkbox" id={toDoItem._id} name={toDoItem._id} checked={toDoItem.isDone} onChange={()=> checkboxClick(toDoItem._id)}/>      
            <span className="checkmark"/>
        </label>
        <div className="three-dots" onClick={() => onThreedotsClick(!isShowingDelete)} ref={ref}>
            <svg width="20" height="6" viewBox="0 0 20 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.19944 2.99985C5.19944 3.63637 4.94659 4.24682 4.4965 4.69691C4.04641 5.147 3.43596 5.39985 2.79944 5.39985C2.16293 5.39985 1.55248 5.147 1.10239 4.69691C0.652301 4.24682 0.399445 3.63637 0.399445 2.99985C0.399445 2.36333 0.652301 1.75288 1.10239 1.3028C1.55248 0.85271 2.16293 0.599854 2.79944 0.599854C3.43596 0.599854 4.04641 0.85271 4.4965 1.3028C4.94659 1.75288 5.19944 2.36333 5.19944 2.99985ZM12.3994 2.99985C12.3994 3.63637 12.1466 4.24682 11.6965 4.69691C11.2464 5.147 10.636 5.39985 9.99944 5.39985C9.36293 5.39985 8.75248 5.147 8.30239 4.69691C7.8523 4.24682 7.59944 3.63637 7.59944 2.99985C7.59944 2.36333 7.8523 1.75288 8.30239 1.3028C8.75248 0.85271 9.36293 0.599854 9.99944 0.599854C10.636 0.599854 11.2464 0.85271 11.6965 1.3028C12.1466 1.75288 12.3994 2.36333 12.3994 2.99985ZM17.1994 5.39985C17.836 5.39985 18.4464 5.147 18.8965 4.69691C19.3466 4.24682 19.5994 3.63637 19.5994 2.99985C19.5994 2.36333 19.3466 1.75288 18.8965 1.3028C18.4464 0.85271 17.836 0.599854 17.1994 0.599854C16.5629 0.599854 15.9525 0.85271 15.5024 1.3028C15.0523 1.75288 14.7994 2.36333 14.7994 2.99985C14.7994 3.63637 15.0523 4.24682 15.5024 4.69691C15.9525 5.147 16.5629 5.39985 17.1994 5.39985Z" fill="#9796A8"/>
            </svg>
            { isShowingDelete ? <div className="popover-delete" onClick={() => deleteToDoItem(toDoItem._id)}>Delete</div> : <></>}
        </div>
    </div>
}

export default ToDoListItem