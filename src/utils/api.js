// const id = "YOUR_CLIENT_ID";
// const sec = "YOUR_SECRET_ID";
const id = "ad3acfe7f798cd9a85fa";
const sec = "97bc2859e85d6365f20da711d4fd3e5bff8acccf";
const params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}${params}`)
    const user = await res.json()
        .catch(err => console.warn(err))
    return user
}

const getRepos = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    const repos = await res.json()
    return repos
}

const getStarCount = (repos) => {
    return repos.reduce((count, repo) => (count + repo.stargazers_count), 0)
}

const calculateScore = (profile, repos) => {
    const followers = profile.followers
    const totalStars = getStarCount(repos)
    return (followers * 3) + totalStars
}

const handleError = (err) => {
    console.warn(err)
    return null
}

export const getUserData = async (player) => {
    const data = await Promise.all([getProfile(player), getRepos(player)])
        .catch(handleError)
    const [profile, repos] = data
    return {
        profile,
        score: calculateScore(profile, repos)
    }
}

const sortPlayers = (players) => (
    players.sort((a, b) => b.score - a.score)
)
 
export async function battle(players) {
    return Promise.all(players.map(getUserData)) // This returns an array
        .then(sortPlayers) // sortPlayers then accepts an array
        .catch(handleError) // It all works just like a callback, just like you would write .catch((err) => handleError(err)), same up there.
}

export async function fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const response = await fetch(encodedURI)
    const json = await response.json()
        .catch(err => console.warn(err))
    const { items: repos } = json
    return repos
} 