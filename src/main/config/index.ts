import "dotenv/config"

let token = process.env.TOKEN || "";

const config = {
    token,
    apiUrl: `https://api.telefone.org/bot${token}`,
    apiFileUrl: `https://api.telefone.org/file/bot${token}`
}

export default config;
