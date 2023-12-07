// AppHeader.js
import { useContext } from 'react';
import PropTypes from 'prop-types';

//--------------COMPONENTS--------------//
import { UserContext } from '../Provider/UserProvider';

const AppHeader = ({ children }) => {
  const { isAdmin } = useContext(UserContext);
  return (
    <div
      className={`AppHeader ${
        isAdmin
          ? 'bg-adminBackground w-100 text-adminText'
          : 'bg-parentBackground text-parentText w-100'
      }`}
    >
      <div className="content-container">{children}</div>
    </div>
  );
};

AppHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppHeader;
