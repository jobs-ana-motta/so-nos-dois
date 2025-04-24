const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

let access_token = '';
let token_expires_at = 0;


export async function getAccessToken() {
    const now = Date.now();

    if(access_token && token_expires_at > now) {
        return access_token;
    }
    let basic =  `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`;
    console.log(client_id, client_secret)
    console.log(basic)
    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: basic,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        });
    
    
        const data = await res.json();
        access_token = data.access_token;
        token_expires_at = now + data.expires_in * 1000;
    
    
        return access_token;
    } catch (error) {
        return '';
    }
    
}