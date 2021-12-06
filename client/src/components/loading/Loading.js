import './Loading.css'
import stu from "../../assets/img/green_stu.PNG"; 

const Loading = () => {
  return(
    <div>
      <h1 className='loader'>Loading...</h1>
      <img alt={""} src={stu}/>
    </div>
  )
}

export default Loading;
