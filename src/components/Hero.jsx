import heroImage from "../assets/people-learning-cafeteria.jpg";

const Hero = () => {
        return (
                <>
                        <div className="my-3">
                                <div className="h-[300px] relative text-white flex flex-col justify-center">
                                        <div className="absolute inset-0 bg-black/80 -z-1"></div>
                                        <img src={ heroImage } alt="cafe hero" className="-z-2 absolute object-cover w-full h-[300px]"/>

                                        <div className="ms-10">
                                                <p className="font-extrabold text-3xl  sm:text-4xl">Temukan Segalanya. Belanja Lebih Mudah</p>
                                                <p className="text-sm sm:text-base"> Produk berkualitas, harga bersahabat. Siap kirim ke seluruh Indonesia</p>
                                        </div>
                                        
                                </div>
                        </div>
                </>
        )
}

export default Hero