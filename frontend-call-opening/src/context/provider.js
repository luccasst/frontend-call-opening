import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import callContext from './context';

function CallProvider({ children }) {
    const [user, setUser] = useState({});
    const contextValue = useMemo(() => ({
        user,
        setUser,
   }), [user]);

   return (
    <callContext.Provider value= { contextValue } />
   );

}
   CallProvider.prototype = {
    children: PropTypes.node.isRequired,
   };
export default CallProvider;