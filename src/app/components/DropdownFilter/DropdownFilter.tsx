import { useState } from "react"
import { ToDoItem } from "@/app/types/ToDoItem"
import "./DropdownFilter.css"
import filters from "@/app/variables/filters"

interface DropdownFilterProps {
    currentFilter: string,
    changeFilter: Function,
    toDoItems: ToDoItem[]
}

const DropdownFilter = ({currentFilter, changeFilter, toDoItems}  : DropdownFilterProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onFilterClick = () => {
        setIsOpen(!isOpen);
    }

    return <div className="dropdown-wrapper" onClick={() => onFilterClick()}>
        <p>{currentFilter}</p>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.50423 0.420898L3.99998 2.92515L1.49573 0.420898L0.670898 1.24573L3.99998 4.57482L7.32907 1.24573L6.50423 0.420898Z" fill="black"/>
        </svg>

        {isOpen ? (<ul className="dropdown-items">
            {filters.map((filter, idx) => {
                const active = filter === currentFilter ? " active" : "";
                return <li key={idx} className={"dropdown-items-list"+active} onClick={() => changeFilter(filter, toDoItems)}>{filter}</li>
            })}
        </ul>) : <></>}    
    </div>
}

export default DropdownFilter