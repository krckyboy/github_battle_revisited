import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

function RepoGrid(props) {
    const repos = props.repos
    return (
        <ul className='popular-list'>
            {
                repos.map((repo, index) => (
                    <li className='popular-item' key={repo.name}>
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li><img src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`} className="avatar" /></li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                ))
            }
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

function SelectLanguage(props) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
        <ul className='languages'>
            {languages.map(lang => (
                <li
                    // 3.
                    style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
                    onClick={() => props.click(lang)}
                    key={lang}>
                    {lang}
                </li>
            ))}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
}

class Popular extends Component {
    _isMounted = false

    state = {
        selectedLanguage: 'All',
        repos: null
    }

    componentDidMount() {
        this._isMounted = true
        this.updateLanguage(this.state.selectedLanguage)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    // 5.
    updateLanguage = async (lang) => {
        this.setState({ selectedLanguage: lang, repos: null })
        const repos = await fetchPopularRepos(lang)
        if (this._isMounted) {
            this.setState({ repos })
        }
    }
    
    render() {
        // 4.
        return (
            <>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} click={this.updateLanguage} />
                {this.state.repos !== null
                    ? <RepoGrid repos={this.state.repos} />
                    : <Loading />}

            </>
        )
    }
}

export default Popular 