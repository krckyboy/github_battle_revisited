// export async function fetchPopularRepos(language) {
//     const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

//     fetch(encodedURI)
//         .then(res => res.json())
//         .then(repos => repos.items)
//         .catch(err => console.log(err))
// }

export async function fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const response = await fetch(encodedURI)
    const json = await response.json()
        .catch(err => err)
    const { items: repos } = json
    return repos
} 