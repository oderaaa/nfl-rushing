import stu from "../../assets/img/blue_stu.PNG"; 
const ErrorDisplay = ({ error }) => {

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error}</p>
      <img alt={""} src={stu}/>
    </div>
  );
};

export default ErrorDisplay;
