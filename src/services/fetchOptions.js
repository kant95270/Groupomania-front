const { VITE_SERVER_ADDRESS,VITE_SERVER_PORT} = import.meta.env
const url =  `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

const headers = {
    authorization : `Bearer ${localStorage.getItem("token")}`,
    "Accept": "application/json",
}

export { url, headers }