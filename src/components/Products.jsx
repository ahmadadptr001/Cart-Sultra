import { useEffect, useState, useRef } from "react"
import { getAll } from "../utils/getApi";
import { getByCategorySlug } from "../utils/getApi";

import { TieredMenu } from "primereact/tieredmenu"
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast"
import { ScrollTop } from "primereact/scrolltop";

import { useDispatch } from "react-redux";
import { addToCart } from "../utils/userCartSlice";

const Products = () => {
        
        const dispatch = useDispatch();
        const toastMessage = useRef(null);
        const [allData, setAllData] = useState('');
        const [slugCategory, setSlugCategory] = useState('');
        const [cardLoading, setCardLoading] = useState("");

        const categoryItems = [
                {
                        label: "Kategori",
                        icon: "pi pi-tags",
                        items: [
                                
                                // disini nama slug nya sama ya tiap kategori *note: gada huruf kapital di slug
                                { label: "Semua Jenis", icon: "pi pi-briefcase", command: () => location.reload() },
                                { label: "Clothes", icon: "pi pi-briefcase", command: () => setSlugCategory('clothes') },
                                { label: "Electronics", icon: "pi pi-bolt", command: () => setSlugCategory('electronics') },
                                { label: "Furniture", icon: "pi pi-th-large", command: () => setSlugCategory('furniture') },
                                { label: "Shoes", icon: "pi pi-compass", command: () => setSlugCategory('shoes') },
                                { label: "Miscellaneous", icon: "pi pi-box", command: () => setSlugCategory('miscellaneous') },
                        ]
                }
        ]
        
        // ini fungsi untuk mendapatkan data semua products
        useEffect(()=> {
                (async () => {
                        try {
                                setCardLoading(cardSkeleton());
                                const result  = await getAll();
                                setAllData(result);
                                setCardLoading("");
                        } catch (err) {

                        }
                })()
        }, [])

        // fungsi untuk mencari barang sesuai kategori
        useEffect(() => {
                if (!slugCategory) return;

                (async () => {
                        setAllData([])
                        setCardLoading(cardSkeleton());
                        const dataCategory = await getByCategorySlug(slugCategory);
                        setAllData(dataCategory);
                        setCardLoading("");
                })()
        }, [slugCategory])

        // fungsi yang menangani penambahan product ke keranjang
        const handleAddCart = (item) => {
                dispatch(addToCart(item))
                toastMessage.current.show({ severity: 'success', summary: 'Sukses', detail: 'Berhasil dimasukkan ke keranjang' })
        }

        // card template (skeleton)
        const cardSkeleton = () => {
                return (
                        <div id="card-wrapper" className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 xl:grid-cols-5 gap-2">

                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>
                                <div id="card-skeleton" className="p-3 rounded-sm bg-gray-800">
                                        <div className="relative">
                                                <Skeleton className="!h-[150px]" />
                                                <svg className="!w-8 !h-8 !top-1/2 left-1/2 -translate-1/2 !absolute opacity-25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>
                                        </div>
                                        <Skeleton className="!w-[80%] mt-2"/>
                                        <Skeleton className="mt-3 !w-[40%] !h-[10px]"/>
                                        <Skeleton className="!w-[50%] mt-1 !h-[10px]"/>
                                        <Skeleton className="mt-2 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px]" />
                                        <Skeleton className="mt-1 !h-[5px] !w-[70%]" />
                                        <Skeleton className="mt-3 !h-[30px] !w-[60%]"/>
                                </div>

                        </div>
                )
        }

        // card template (error)
        const cardError = () => {
                return (
                        <div className="mt-5 py-5 flex items-center justify-center text-red-400 font-extraboldn text-[1.5rem]">
                                Connection Error..
                        </div>
                )
        }

        // card template (product)
        const cardProduct = (item) => {
                return (
                        <div key={item.id} id="card" className="p-3 rounded-sm border-none bg-gray-800 text-gray-300 h-full">
                                <img 
                                        alt={item.slug}
                                        onError={(e) => {
                                                e.target.src = "https://placehold.co/600x400?text=Gambar Kosong"
                                        }}
                                        className="rounded-sm w-full object-cover h-[150px]"
                                        src={ item.images[0] } />
                                <p id="title-product" className="text-[1rem] sm:text-[1.2rem] mt-1 font-bold line-clamp-1">{item.title}</p>
                                <p id="price" className="text-[.8rem] sm:text-[.9rem] mt-3 flex items-center gap-1">
                                        <span className="text-green-400"><i className="pi pi-wallet"></i> Harga:</span> ${item.price}
                                </p>
                                <div id="kategori" className="flex gap-1 flex-nowrap items-center text-[.8rem] sm:!text-[.9rem]">
                                        <span className="text-blue-400 flex items-center gap-1"><i className="pi pi-tags"></i> Category: </span>
                                        <img 
                                                alt="slug" 
                                                src={ item.category.image } 
                                                onError={(e)=> {
                                                        e.target.src = "https://www.vizion.com/wp-content/smush-webp/2018/09/shutterstock_479042983.jpg.webp"
                                                }}
                                                className="w-[15px] h-[15px] object-cover rounded-full"/>
                                        <p className="line-clamp-1">{ item.category.name }</p>
                                </div>
                                <p id="deskripsi" className="text-[.7rem] sm:text-[.9rem] line-clamp-3 mt-3 text-gray-400">{item.description}</p>

                                <Toast ref={toastMessage} position="top-right" className="!w-[90%] !text-sm"/>
                                <Button onClick={() => handleAddCart(item)} label="+Tambahkan" icon="pi pi-shopping-cart" className="!py-2 !mt-3 !text-[0.8rem] sm:text-[1rem]"></Button>
                                
                        </div>
                )
        }

        return (
                <div className="px-7 mt-2">
                        <div>
                                <TieredMenu model={categoryItems} breakpoint="420px"/>
                        </div>
                        <ScrollTop target="window" threshold={100} className="z-10 w-[2rem] h-[2rem] boder-round !bg-sky-400" icon="pi pi-arrow-up text-base"/>

                        {
                                allData.length === 0 ? (
                                        <>
                                                { cardLoading }
                                        </>
                                ) : (
                                <div id="card-wrapper" className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 xl:grid-cols-5 gap-2">
                                        {allData.map((item, index) => (
                                                <div key={index}>
                                                        { cardProduct( item ) }
                                                </div>
                                        ))}
                                </div>
                                )
                        }
                </div>
        )
}

export default Products