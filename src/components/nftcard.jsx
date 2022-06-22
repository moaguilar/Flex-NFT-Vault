const NftCard = ({ image, id, title, address, description, attributes }) => {
    let imgDisplay = <img className='w-full rounded-t-md' key={id} src={image}></img>
    if(image.substr(image.length-4, 4) != ".jpg" && image.substr(image.length-4, 4) != ".png") {
        imgDisplay = <img className='w-full rounded-t-md' key={id} src={'https://lh3.googleusercontent.com/ZIplQ_1mLnATWy3hsAWf8HTM3ZIvONpJzAOEuoJx6smp-j1bC4dvgHUXqg8ajdyrOLvHSl_cyQnbWE5xizZlDkOm73U4MljT29ypOfY=w356'}></img>
    }

    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            {imgDisplay}
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${address}`}>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
                    </div>
                </div>
                <p>{description? description.slice(0, 200) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">
                {attributes?.length > 0 && attributes.map(attribute => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col">
                            <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                            <p className="text-sm">{attribute.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NftCard