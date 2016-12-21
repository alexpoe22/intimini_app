import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import EntriesHeader from './entries_header';
import DisplayEntries from './display_entries';
import Welcome from './welcome';
import ErrorDisplay from './error_display';
import NewEntry from './new_entry';

// HARD CODED:
// logged-in user id

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.logInUser = this.logInUser.bind(this);
		this.selectEntry = this.selectEntry.bind(this);
		this.postNewEntry = this.postNewEntry.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
		this.updateEntry = this.updateEntry.bind(this);
	}

	componentDidMount () {
		this.props.dispatch(actions.getUser());
		this.props.dispatch(actions.getEntries());
	}

// USERS

	logInUser (event) {
		this.props.dispatch(actions.toggleLogIn(4));
	}

	anyoneHome (users) {
		for (var i = 0; i < users.length; i++) {
			if (users[i].loggedIn) {
				return users[i];
			}
		}
		return false;
	}

// ENTRIES

	selectEntry (id) {
		this.props.dispatch(actions.getEntries(id));
	}

	postNewEntry (text) {
		this.props.dispatch(actions.postNewEntry(text));
	}

	deleteEntry (id) {
		this.props.dispatch(actions.deleteEntry(id));
		this.props.dispatch(actions.getEntries());
	}

	updateEntry (id, text) {
		this.props.dispatch(actions.updateEntry(id, text));
	}

	render () {

		const stateUsers = this.props.store.usersReducer.usersList;
		const stateEntries = this.props.store.entriesReducer.entriesList;
		let users, entries = [];

		console.log('get entries', stateEntries);

		!stateUsers ?
		users = '' :
		users = stateUsers.map((user, idx) => {
			return user;
		})

		if (!stateEntries) {
			entries = '';
	} else if (stateEntries.entry) {
			entries.push(stateEntries.entry[0]);
		} else {
			entries = stateEntries.entries.map((entry, idx) => {
				return entry;
			});
		}


	if (this.anyoneHome(users)) {
		var isLoggedIn = this.anyoneHome(users);
		return (
			<div>
				<EntriesHeader user={isLoggedIn} />
				<NewEntry postNewEntry={this.postNewEntry} />
				<DisplayEntries
					user={isLoggedIn}
					entries={entries}
					updateEntry={this.updateEntry}
					deleteEntry={this.deleteEntry}
					selectEntry={this.selectEntry}
				/>;
			</div>
		)
	} else if (users.length > 0 && entries.length > 0) {
			return (
				<Welcome logInUser={this.logInUser} />
			)
	} else {
			return (
				<ErrorDisplay />
			)
		}
	}
}

const mapStateToProps = (state, props) => ({
	store: state
});

export default connect(mapStateToProps)(LoginContainer);
