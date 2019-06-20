import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reader from './Reader';

class ReaderNavigator extends Component {
	render() {
		const { course, module, courses } = this.props;
		return <Reader module={courses[course][module]} />;
	}
}

export default connect((state) => ({ courses: state.courses }))(ReaderNavigator);
