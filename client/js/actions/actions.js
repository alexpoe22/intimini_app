const users_url = "http://localhost:8080/users";
const entries_url = "http://localhost:8080/entries";

// SYNC // USERS

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const getUserSuccess = userInfo => ({
    type: GET_USER_SUCCESS,
   	userInfo,
		loggedIn: false,
		visible: false
});

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const deleteUserSuccess = userInfo => ({
    type: DELETE_USER_SUCCESS,
   	userInfo
});

// SYNC // USERS

export const GET_ENTRIES_SUCCESS = 'GET_ENTRIES_SUCCESS';
export const getEntriesSuccess = entriesInfo => ({
    type: GET_ENTRIES_SUCCESS,
   	entriesInfo,
		visible: false
});

// ASYNC // ENTRIES

export const getEntries = () => dispatch => {
	return fetch(entries_url)
		.then(res => {
			if(!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json()
		}).then(res => {
			dispatch(getEntriesSuccess(res));
		}).catch(err => {
			console.log('error:', err);
		})
}

// ASYNC // USERS

export const getUser = () => dispatch => {
	return fetch(users_url)
		.then(res => {
			if(!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json()
		}).then(res => {
			dispatch(getUserSuccess(res));
		}).catch(err => {
			console.log('error:', err);
		})
}

export const deleteUser = () => dispatch => {
	dispatch(dbRequest());
	return fetch(url,
		{
			method: "DELETE",
			body: JSON.stringify({id: 2}),
			headers: {"Content-Type": "application/json"}
		}
	)
		.then(res => {
			if(!res.ok) {
				throw new Error(res.statusText);
			}
		}).then(res => {
			console.log('success');
		}).catch(err => {
			console.log('error');
		})
}
