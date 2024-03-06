import { useState } from "react"
import "./InputWithButton.css"

interface InputWithButtonProps {
    onAdd: Function,
    isLoading: boolean,
}

const InputWithButton = ({onAdd, isLoading} : InputWithButtonProps) => {
    const [inputText, setInputText] = useState<string>("")
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedText = e.target.value;
        setInputText(updatedText);
    }

    return <form className="input-wrapper" onSubmit={ async(e: React.FormEvent<HTMLFormElement>) => {await onAdd(inputText, e); setInputText("")}}>
        <input className="w-11/12 input-text" placeholder="Add your to-do ..." value={inputText} onChange={onChange}/>
        <button type="submit" className="add-button" disabled={isLoading || !inputText || inputText === ""}>Add</button>
    </form>
}

export default InputWithButton