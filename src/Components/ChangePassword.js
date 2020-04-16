import React, { useContext, useCallback, useState } from 'react'
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';
function ChangePassword() {
    const { currentUser } = useContext(AuthContext);
    const [pwMatch, setpwMatch] = useState("");
    console.log(currentUser);
    return (
        <div>
            <h2>This changes the password</h2>
        </div>
    )
}

export default ChangePassword