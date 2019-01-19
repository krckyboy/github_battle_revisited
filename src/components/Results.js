import React, { Component } from 'react'
import { battle } from '../utils/api'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

class Profile extends Component {
    render() {
        const { avatar_url: avatar,
            login: username,
            name,
            location,
            company,
            followers,
            following,
            public_repos,
            blog,
        } = this.props.info

        return (
            // 12.
            <PlayerPreview avatar={avatar} username={username}>
                <ul className='space-list-items'>
                    {name && <li>{name}</li>}
                    {location && <li>{location}</li>}
                    {company && <li>{company}</li>}
                    <li>Followers: {followers}</li>
                    <li>Following: {following}</li>
                    <li>Public Repos: {public_repos}</li>
                    {blog && <li><a href={blog}>{blog}</a></li>}
                </ul>
            </PlayerPreview>
        )
    }
}

class Player extends Component {
    render() {
        const { label, score, profile } = this.props
        return (
            <div>
                <h1 className='header'>{label}</h1>
                <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
                <Profile info={profile} />
            </div>
        )
    }

    static propTypes = {
        label: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        profile: PropTypes.object.isRequired,
    }
}

class Results extends Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    }
    componentDidMount() {
        const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search)
        battle([playerOneName, playerTwoName])
            .then(results => {
                if (results === null) {
                    return this.setState({ error: 'There has been a error', loading: false })
                }

                this.setState({
                    loading: false,
                    error: null,
                    winner: results[0],
                    loser: results[1]
                })
            })
    }
    render() {
        const { winner, loser, error, loading } = this.state

        if (loading) {
            return (
                <Loading />
            )
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results