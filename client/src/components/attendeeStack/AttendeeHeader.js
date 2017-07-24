import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

export default class AttendeeHeader extends Component {

	constructor(props) {
    super(props);
	}
	
	render() {
		return (
			<Header>
				<Left>
					<Button dark transparent onPress={() => {this.props.openDrawer()}}>
						<Icon ios='md-menu' android="md-menu"/>
							</Button>
				</Left>
				<Body>
					<Title>{ this.props.title }</Title>
				</Body>
				<Right />
			</Header>
		);
	}
}
