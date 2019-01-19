import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PlayerPreview from './PlayerPreview'



class PlayerInput extends Component {
    state = {
        username: ''
    }
    handleChange = (event) => {
        const value = event.target.value
        this.setState({ username: value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.props.id, this.state.username)
    }
    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor="username">
                    {this.props.label}
                </label>
                <input
                    type="text"
                    placeholder='github username'
                    id='username'
                    autoComplete='off'
                    onChange={this.handleChange}
                    value={this.state.username}
                />
                {/* 10. */}
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }
}

class Battle extends Component {
    state = {
        playerOneName: null,
        playerTwoName: null,
        playerOneImage: null,
        playerTwoImage: null,
    }

    handleReset = (id) => {
        this.setState(() => {
            const newState = {}
            newState[id + 'Name'] = null
            newState[id + 'Image'] = null
            return newState
        })
    }

    // 8.
    handleSubmit = (id, username) => {
        this.setState(() => {
            const newState = {}
            newState[id + 'Name'] = username
            newState[id + 'Image'] = `https://github.com/${username}.png?size=200`
            return newState
        })
    }

    render() {
        // 9.
        const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state
        const { match } = this.props
        return (
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                        />}

                    {playerOneImage &&
                        <PlayerPreview avatar={playerOneImage} username={playerOneName} >
                            <button className='reset' onClick={() => this.handleReset('playerOne')}>Reset</button>
                        </PlayerPreview>
                    }


                    {!playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                        />}

                    {playerTwoImage &&
                        <PlayerPreview avatar={playerTwoImage} username={playerTwoName} >
                            <button className='reset' onClick={() => this.handleReset('playerTwo')}>Reset</button>
                        </PlayerPreview>
                    }

                </div>
                {playerOneImage && playerTwoImage &&
                    // 11.
                    <Link
                        className='button'
                        to={{
                            pathname: `${match.url}/results`,
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}>
                        Battle
                    </Link>
                }
            </div>
        )
    }
}

export default Battle
