import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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
                    // Dynamically setting up styles.
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
    constructor(props) {
        super(props)
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }
    /* First we handle the synchronous code
    And then the async, to avoid slow reaction for 'active' UI*/
    updateLanguage = async (lang) => {
        this.setState({ selectedLanguage: lang, repos: null })

        const repos = await fetchPopularRepos(lang)
        this.setState({ repos })
    }
    render() {
        /* Passing a function to a child component as a prop (click), 
        and then in the child component, we use it for onClick,
        passing the argument.*/
        return (
            <>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} click={this.updateLanguage} />
                {this.state.repos !== null
                    ? <RepoGrid repos={this.state.repos} />
                    : <p>Loading</p>}

            </>
        )
    }
}

export default Popular 