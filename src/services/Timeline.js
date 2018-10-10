export function fetchActivities({seed, page}){
    return fetch(`https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`)
            .then(res => res.json())
            .catch(err => {
                console.error(err);
            });
}