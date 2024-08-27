import SearchBar from "../components/Track/Track";

//allows connection to the spotify api
const clientId = "8cb21de573b84cb19ca5963eb5d49349";
const redirectUri="http://localhost:3000";
let accessToken;

const Spotify={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch= window.location.href.match(/access_token-([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in([^&]*)/)
        if(accessTokenMatch && expiresInMatch){
            accessToken=accessTokenMatch[1];
            const expiresIn=Number(expiresInMatch[1]);
            window.setTimeout(() =>{
                accessToken=""}, expiresIn * 1000
            );
            window.history.pushState("Access Token",null,"/");
            return accessToken;
        }
        else{
            //acess url we connect with client id and redirect url
            const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location=accessUrl;
        }
    },

    //search data using the search term provided
    search(term){
        const accessToken=Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&g=${term}`,{
            headers:{
                Authorization: 'Bearer ${accessToken}'
            }
            //if we find the term we get response of the data
        }).then(response => {
            return response.json();
            //iterate over json response and 
        }).then(jsonResponse => {
            return response.json();
        }).then(jsonResponse =>{
            if(!jsonResponse.tracks){
                return[]; 
            }
            //get a list of tracks out of it
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },
    //save data to spotify
    savePlaylist(name, trackUris){
        if(!name || trackUris.length){
            return;
        }
        const accessToken= Spotify.getAccessToken();
        const headers={Authorization: 'Bearer ${accessToken}'};
        let userId; 

        return fetch("https://api.spotify.com/v1/me",{headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId= jsonResponse.id;
            return fetch("https://api.spotify.com/v1/user/${userId}/playlists",{
                headers: headers,
                method: "POST",
                body: JSON.stringify({name:name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId=jsonResponse.id;
                return fetch(
                    "https://api.spotify.com/v1/user/${userId}/playlists/${playlistId}/tracks",
                    {
                        headers: headers,
                        methods: "POST",
                        body: JSON.stringify({uris:trackUris})
                    }
                );
            });
        });

    }
};

export default Spotify;