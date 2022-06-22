// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = "GqYATYYw3GTJP7CiJk7hgTRVsKPQ701V";
const endpoint = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;

export const fetchNFTs = async (owner, contractAddress1, contractAddress2, setNFTs, retryAttempt) => {
    let arrNFT = new Array()
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data1;
        let data2;
        try {
            if (contractAddress1) {
                data1 = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress1}`).then(data1 => data1.json())
                data2 = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress2}`).then(data2 => data2.json())
            } else {
                data1 = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(endpoint, owner, contractAddress1, contractAddress2, setNFTs, retryAttempt+1)
        }

        arrNFT = data1.ownedNfts.concat(data2.ownedNfts)
        setNFTs(arrNFT)
        return arrNFT
    }
}
