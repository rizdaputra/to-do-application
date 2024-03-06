import "./ProgressCard.css"

interface ProgressCardProps {
    progressData : {
        totalTasks: number,
        doneTasks: number
    }
}

const ProgressCard = ({progressData} : ProgressCardProps) => {
    return <div className="progress-card">
        <h2 className="progress-card-title">Progress</h2>
        <div className="w-full bg-white rounded-full h-1.5 progress-card-bar">
            <div className="h-1.5 rounded-full progress-card-bar-done" style={{width: ((progressData.doneTasks/progressData.totalTasks)*100)+ "%"}}></div>
        </div>
        <p className="text-base font-normal">{progressData.doneTasks + " Completed"}</p>
    </div>
}

export default ProgressCard