import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {CallContext} from './context';

function CallProvider({ children }) {
  const [user, setUser] = useState({});
  const [calls, setCalls] = useState([]);
  const contextValue = useMemo(() => ({
    user,
    setUser,
    calls,
    setCalls
  }), [user,
    setUser,
    calls,
    setCalls]);

  return (
    <CallContext.Provider value={contextValue}>
      {children}
    </CallContext.Provider>
  );
}

CallProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CallProvider;
