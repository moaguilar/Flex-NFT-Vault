import { useState } from 'react';
import NftCard from '../components/nftcard';
import {fetchNFTs} from '../utils/fetchNFTs';

import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

const walletConnector = new NodeWalletConnect(
  {
    bridge: "https://bridge.walletconnect.org", // Required
  },
  {
    clientMeta: {
      description: "WalletConnect NodeJS Client",
      url: "https://nodejs.org/en/",
      icons: ["https://nodejs.org/static/images/logo.svg"],
      name: "WalletConnect",
    },
  }
);


  
const Explore = () => {

    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")

	walletConnector.on("connect", (error, payload) => {
		if (error) {
		throw error;
		}
	
		// Close QR Code Modal
		WalletConnectQRCodeModal.close(
		true // isNode = true
		);
	
		// Get provided accounts and chainId
		const { accounts, chainId } = payload.params[0];
	
		//{fetchNFTs("0xB392Fab5675D65d347AA2F9101b44c434ebF9d03", "0x5AD0aB392b9647D2293361864D4c0d68D52111A3", "0x5F0e4269e4057Bc0f0f665d68f3106e2386D8bf4", setNFTs)}	// TESTING
		{fetchNFTs(accounts[0], "0x5AD0aB392b9647D2293361864D4c0d68D52111A3", "0x5F0e4269e4057Bc0f0f665d68f3106e2386D8bf4", setNFTs)}	// PRODUCTION

	});
	

	function openConnection(){

		if (!walletConnector.connected) {
			// create new session
			walletConnector.createSession().then(() => {
				// get uri for QR Code modal
				const uri = walletConnector.uri;
				// display QR Code modal
				WalletConnectQRCodeModal.open(
					uri,
					() => {
					console.log("QR Code Modal closed");
					},
					true // isNode = true
				);
			});
		}
	  
	}

	function openMetamask() {
		console.log("metamask");
		if(window.ethereum){
			window.ethereum.request({method:'eth_requestAccounts'})
			.then(res=>{
				//{fetchNFTs("0xB392Fab5675D65d347AA2F9101b44c434ebF9d03", "0x5AD0aB392b9647D2293361864D4c0d68D52111A3", "0x5F0e4269e4057Bc0f0f665d68f3106e2386D8bf4", setNFTs)}	// TESTING
				{fetchNFTs(res[0], "0x5AD0aB392b9647D2293361864D4c0d68D52111A3", "0x5F0e4269e4057Bc0f0f665d68f3106e2386D8bf4", setNFTs)}	// PRODUCTION
			})
		}else{
			alert("install metamask extension!!")
		}		
	}

	if (walletConnector.connected) {
		walletConnector.killSession();
	}
	let hasNFT = NFTs.length > 0;
    return (
        <div className='alchemy'>
			
			<header className='justify-center'>
				<div className='flex flex-col items-center mb-4 martop imm'>
					<img className='imm' src="./images/flex-white.png" width="260" ></img>
					 <div className='mb-16 text-white text-center imm'>
						 <h2 className='text-7xl  font-bold font-body mb-2'>VAULT</h2>
					</div>
				</div>
				<div><button className='btwhite' onClick={() => openConnection()}>Connect Wallet</button></div>
				
				<div className='pos2'><img src="./images/squiggles.png" width="350" height="132" alt=""/></div>
				<div className='pos3'><img src="./images/squiggles.png" width="350" height="132" alt=""/></div>
				<div className='pos4'><img src="./images/circle-lrg.png" width="550"  alt=""/></div>
				<div className='pos5'><img src="./images/circle-lrg.png" width="450"  alt=""/></div>
				<div className='pos6'><img src="./images/circle-lrg.png" width="550"  alt=""/></div>
				
			</header>
			
			<section className='flex flex-wrap justify-center'>
				 <div className='flex flex-col items-center mb-12'>
					  <div className='mb-16 text-white text-center imm'>
						  <img src="./images/watches.png" width="1100"></img>
					 </div>
                    <div className='mb-16 text-white text-center'>
						<h2 className='text-5xl  font-bold font-body mb-2'>UNLOCK YOUR NFT WATCHES</h2>
				 	</div>
				</div>	
			</section>
			
			<section className='flex flex-wrap justify-center'>
				 <div className='flex flex-col items-center mb-12'>
					 <div className='mb-16 text-white text-center imm'>
						 <img src="./images/watch-box.png" width="500"></img>
					 </div>
                    <div className='mb-16 text-white text-center'>
						
						<h2 className='text-5xl  font-bold font-body mb-2'>1 NFT = 2 WATCHES. </h2>
						<h2 className='text-5xl  font-bold font-body mb-2'>2 WATCHES = 4 COMBOS.</h2>
				 	</div>
				</div>	
			</section>
			
			<section className='flex flex-wrap justify-center whiterborder'>
				 <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
						<h2 className='text-5xl  font-bold font-body mb-2'>HOW TO CLAIM YOUR WATCH</h2>
				 	</div>
					  <div className='mb-16 text-white text-center'>
						<h3 className='hdnum'>1</h3>
						<h4 className='text-4xl mb-16 font-bold'>Connect your wallet using the button on the top right.</h4>
						<h3 className='hdnum'>2</h3>
						<h4 className='text-4xl mb-16 font-bold'>Authenticate the Flex WalletConnect.</h4>
						<h3 className='hdnum'>3</h3>
						<h4 className='text-4xl mb-16 font-bold'>Verify the ownership of your NFT’s.</h4>
						<h3 className='hdnum'>4</h3>
						<h4 className='text-4xl mb-16 font-bold'>Submit the form to claim your FREE watches.</h4>
						<h3 className='hdnum'>5</h3>
						<h4 className='text-4xl mb-16 font-bold'>Check your email for confirmation.</h4>
				 	</div>
				</div>	
			</section>
			
			<section className='flex justify-center text-center'>
				<div className='flex flex-col items-center mb-12'>
				<img src="./images/arrow-down.png" width="80"></img>
				<div><button className='btwhite1' onClick={() => openConnection()}>Connect Wallet</button></div>
				</div>
			</section>
			
			<section className='flex justify-center text-center'>
				<div className='flex flex-col items-center mb-12'>
					<div className='text-center'><img src="./images/squiggles.png" width="260"></img></div>
				</div>
			</section>
			
			{ hasNFT ? (
			<section className='flex flex-wrap justify-center'>
				
				<div className='mb-16 text-white text-center'><h2 className='text-5xl  font-bold font-body mb-2 text-center'>Your Flex Vault is looking good!</h2></div>
				
            </section>
			) : (
				
				<div></div>) }
			
			<section className='flex flex-wrap justify-center'>
				
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                           <NftCard image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} ></NftCard>
                        )
                    }) : <div className='mb-16 text-white text-center text-8xl'>No NFTs found</div>
                }
				
            </section>
			
			
			
			
			
			{ hasNFT ? (
			<section className='flex flex-wrap justify-center whiterborder'>
			<div className='mb-4 text-white text-center'><h2 className='text-5xl  font-bold font-body mb-2'>Submit the form to claim your FREE watches.</h2></div>
			<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd17-qSh32n2SRjaIi5d1BBcZsEDnJM4cNvlk8gqUW_2wiGRA/viewform?embedded=true" width="100%" height="1550" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
			</section>) : (
				
				<div></div>) }
				
				
			<section className='flex flex-wrap justify-center'>
			<div className='text-center'><img src="./images/squiggles.png" width="220"></img></div>
				
			</section>
			
			<section className='flex flex-wrap justify-center whiterborderno'>
				<div className='mb-16 text-white'>
				<h2 className='text-5xl  font-bold font-body mb-2 text-center'>FAQ:</h2>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>When can I claim my Flex Watches?</h3>
				<p className='mb-4'>The claim window opens on Monday June 20, 2022 and the window closes on July 15, 2022.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Where can I claim my Watches?</h3>
				<p className='mb-4'>The only place that you can claim your products is on the official website vault.flexnft.io</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>How many Flex watches do I get?</h3>
				<p className='mb-4'>You will get 2 Flex watches. Each watch comes with an interchangeable band, so 2 watches makes 4 color combos.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>How do I get my FREE Metaprenuer Flex watch?</h3>
				<p className='mb-4'>We will scan and verify if you hold a MP when you connect your wallet. If you do, you will automatically receive a FREE MP Flex Watch in your shipment.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Do the watches come in a special box?</h3>
				<p className='mb-4'>The Watches are shipped in a special edition collectors box with a scannable QR code that links to the corresponding collection on Opensea.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What if I own multiple Flex NFTs?</h3>
				<p className='mb-4'>You can claim one full set of watches per Flex NFT that you own. Each NFT comes with a second watch FREE!</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What if I own a Flex x MBH NFT?</h3>
				<p className='mb-4'>You can claim one full set of watches per Flex x MBH NFT that you own. If you own multiple MBH NFTS you can claim multiple sets of watches.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What if I own a Flex NFT and a Flex x MBH?</h3>
				<p className='mb-4'>You can claim one full set of watches per Flex NFT and Flex MBH NFT! So if you minted 2 NFTS, you will get 2 boxes. Each box still contains 2 Watches, so you will get 4 watches and can make 16 combos etc..</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What if I own multiple Flex x MBH?</h3>
				<p className='mb-4'>Each wallet that holds the 1155 NFT will be shipped 1 set of watches for each token ID. .</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>I don’t have a Flex NFT, can I still claim the physical watch?</h3>
				<p className='mb-4'>No, you cannot claim any Flex NFT watches unless you have aFlex NFT.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>How can I buy a Flex NFT?</h3>
				<p className='mb-4'>You can mint a Flex NFT on our official website flexnft.io</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Can I change the address once I have ordered?</h3>
				<p className='mb-4'>No; unfortunately we can not change the orders once they are claimed. </p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Do I have to pay for the physical product?</h3>
				<p className='mb-4'>If you hold a Flex  NFT, then claiming the physical watches is completely free.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What happens once I claim all my watch?</h3>
				<p className='mb-4'>Once you claim all of your products, you will receive a shipment in the mail within 2 weeks.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Are NFTs on the secondary market valid for product claims?</h3>
				<p className='mb-4'>NFTs purchased on the secondary market after July 15th are not valid for the product claims in 2022.  Make sure that you only trade the official NFT, which can be found on the official OpenSea page.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>What happens if I sell my NFT after I have ordered?</h3>
				<p className='mb-4'>You can sell your NFT after you have ordered, but future owners will not be able to claim these specific watches.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>If I bought an NFT on the secondary market, how do I claim the product?</h3>
				<p className='mb-4'>If you purchase a Flex NFT that has not been used to claim watches already, you can claim the product using your wallet address before the claim period ends on 7/15.</p>
				<div className='mb-8'> </div>
				<h3 className='text-2xl font-bold font-body'>Can anyone with an NFT claim a watch?</h3>
				<p className='mb-4'>You will not be able to order physical product if you are a Specially Designated National or have an address in the following sanctioned countries and territories:</p>
				<p><ol><li>Afghanistan</li>
<li>Belarus</li>
<li>Central African Republic</li>
<li>Cuba</li>
<li>Crimea region of Ukraine</li>
<li>Democratic Republic of Congo</li>
<li>Ukraine</li>
<li>Ethiopia</li>
<li>Iran</li>
<li>Iraq</li>
<li>Lebanon</li>
<li>Libya</li>
<li>Mali</li>
<li>Myanmar</li>
<li>Nicaragua</li>
<li>North Korea</li>
<li>Russia</li>
<li>Somalia</li>
<li>Sudan and Darfur</li>
<li>Syria</li>
<li>Venezuela</li>
<li>Yemen</li>
<li>Zimbabwe</li>
</ol>
</p>
				<hr className='mb-4'></hr>
				</div>
			</section>
			
        </div>

    )

	}


export default Explore