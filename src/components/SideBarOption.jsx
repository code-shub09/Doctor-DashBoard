import { useContext } from "react";
import { Link } from "react-router-dom";
import { doctorContext } from "../store/contextX";


function SideBarOption({ optionName, linkX, classNameX}) {
     

    const {OptionClicked}=useContext(doctorContext);
   
    

    // function handleClick(e){
    //     console.log(optionName);
    //     const temp=optionName;
    //     console.log(typeof(temp));

    //     setOptionclicked(temp);
    //     console.log('adad')
    //     console.log(OptionClicked);
        

    // }
  return (
    <>
      <li>
        {optionName == OptionClicked ? (
          <Link to={linkX} className="nav-link text-white li-x active" >
            <div className="dashbuttonz">
              <i className={classNameX}></i>
              <span className="option-dashboard">{optionName}</span>
            </div>
          </Link>
        ) : (
          <Link to={linkX} className="nav-link text-white li-x"  >
            <div className="dashbuttonz" >
              <i className={classNameX}></i>
              <span className="option-dashboard">{optionName}</span>
            </div>
          </Link>
        )}
      </li>
    </>
  );
}

export default SideBarOption;
