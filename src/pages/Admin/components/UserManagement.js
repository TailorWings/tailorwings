import React, { useEffect, useState } from 'react';
import { fetchCondition, updateDocument } from '../../../services/API/firebaseAPI';

function UserManagement() {
	const [emailCus, setEmailCus] = useState(null);
    const [notification, setNotification] = useState(null);

	async function handleClickSetRole() {
		let infoCus = await fetchCondition('customers', 'email', '==', emailCus);
        if(infoCus.length > 0){
            updateDocument('customers',infoCus[0].id, 'r', 'ad').then(setNotification("Success"))
        }else{
            setNotification("Error! Email does not exit")
        }
	}

	return (
		<div className="c-admin-users">
			<div className="c-admin-users__input">
				<input
					type="email"
					placeholder="Input Email"
					onChange={(e) => {
						setEmailCus(e.target.value);
					}}
				/>
			</div>
			<div
				className="c-admin-users__button"
				onClick={() => {
					handleClickSetRole();
				}}
			>
				Set Role Admin
			</div>
            <br />
            <span className="c-admin-users__notification">{notification}</span>
		</div>
	);
}

export default UserManagement;
