import React, { useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import "../stylesheet/login.css";
  
const Error = () => {
  const navigate = useNavigation()
  useEffect(() => {
    navigate('/login')
  }, [])
  return (
    <div className="error">
      <h2 className="h2">Error 404 Page not Found</h2>
      <Link to="/login">
        Return to Login Page{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="27"
          viewBox="0 0 19 27"
          fill="none"
        >
          <path
            d="M15.9845 13.7068L10.922 18.7693C10.7635 18.9278 10.5485 19.0168 10.3243 19.0168C10.1001 19.0168 9.88516 18.9278 9.72665 18.7693C9.56814 18.6107 9.4791 18.3958 9.4791 18.1716C9.4791 17.9474 9.56814 17.7325 9.72665 17.5739L13.3484 13.9536H3.01251C2.78874 13.9536 2.57412 13.8647 2.41589 13.7064C2.25766 13.5482 2.16876 13.3336 2.16876 13.1098C2.16876 12.886 2.25766 12.6714 2.41589 12.5132C2.57412 12.3549 2.78874 12.2661 3.01251 12.2661H13.3484L9.72806 8.64355C9.56955 8.48505 9.4805 8.27006 9.4805 8.0459C9.4805 7.82173 9.56955 7.60675 9.72806 7.44824C9.88657 7.28973 10.1016 7.20068 10.3257 7.20068C10.5499 7.20068 10.7649 7.28973 10.9234 7.44824L15.9859 12.5107C16.0645 12.5892 16.1269 12.6825 16.1695 12.7852C16.212 12.8878 16.2338 12.9979 16.2337 13.109C16.2336 13.2202 16.2115 13.3302 16.1687 13.4328C16.1259 13.5353 16.0633 13.6284 15.9845 13.7068Z"
            fill="#1F2348"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Error;
