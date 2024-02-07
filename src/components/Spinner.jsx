import Spin from "../images/spinner.svg";

export default function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center 
     h-screen fixed z-50 left-0 right-0 top-0 bottom-0">
      <div>
        <img src={Spin} alt="Loading..." className="w-24" />
      </div>
    </div>
  )
}
