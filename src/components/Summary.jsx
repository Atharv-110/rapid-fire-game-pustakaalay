import { useNavigate } from "react-router-dom"

const Summary = () => {
  const navigate = useNavigate();
    return (
    <div className='summary'>
        <h1>Summary Page</h1>
        <button className='submit_Btn' onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Summary