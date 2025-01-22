import Image from "next/image"

const PRODUCTS = ({products}) => {

    
    const toMoney = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(num);

        
    }

    return (
        <div className="w-[100%] h-auto flex flex-row flex-wrap">
            {console.log(products)}
            {
                products.map(({body_html, status, image, title, variants, id},index) => 
                (
                    
                    <div className="w-[18%] m-[1%] cursor-pointer" key={index} id={id}>
                        <Image src = {image.src} alt={title} style={{height:"50%"}} width={image.width} height={image.height} className="w-[100%] object-cover"/>
                    
                        <p>{ title.length > 40 ? `${title.substr(40)}...` : title}</p>
                        <p style={{height:"40px",background:status === "active" ? "#83D475" : "#ba3030",color:"#fff",textAlign:"center"}}>{status === "active" ? "in store" : "sold out"}</p>
                        {/* {console.log(variants.map(({price}) => parseFloat(price)))} */}
                        <p><b>KSH {variants.length > 1 ? toMoney(Math.max(...variants.map(({price}) => parseFloat(price)))) : toMoney(variants.map(({price}) => parseFloat(price))[0])} - KSH {variants.length > 1 ? toMoney(Math.min(...variants.map(({price}) => parseFloat(price)))) : toMoney(variants.map(({price}) => parseFloat(price))[0])}</b></p>
                    </div>
                )
                )
            }
        </div>
    )
}

export default PRODUCTS