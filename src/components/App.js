import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Popular from './Popular'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'

function Badge(props) {
	return (
		<div className='container'>
			<img
				src={props.img}
				alt="Avatar"
				style={{ width: 100, height: 100 }}
			/>
			<h1>Name: {props.name}</h1>
			<h3>username: {props.username}</h3>
		</div>
	)
}

Badge.propTypes = {
	img: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Nav />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={() => <p>Not found!</p>} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App
