import {apiUrl} from "./config";


const apis = {
    // leagues
    'create_league': apiUrl + "/league/create",
    'get_leagues': apiUrl + '/league/get',
    'update_league': (id) => {
        return `${apiUrl}/league/update/${id}`
    },
    'delete_league': (id) => {
        return `${apiUrl}/league/delete/${id}`
    }

}

export default apis;