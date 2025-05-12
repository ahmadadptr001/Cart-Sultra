import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteCart } from "../utils/userCartSlice";
import { decrementCart } from "../utils/userCartSlice";
import { incerementCart } from "../utils/userCartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

import moneyBag from "../assets/money-bag.png";

const ListCart = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const products = useSelector((state) => state.cart.product);
        
        const headerTable = (
                <div className="flex items-center justify-between py-5">
                        <span className="text-base sm:text-lg lg:text-xl font-extrabold flex items-center gap-2">
                                <i className="pi pi-shopping-cart"></i> <span>Keranjang Anda</span>
                        </span>
                        <i className="pi pi-home cursor-pointer !text-lg" onClick={() => navigate('/')}></i>
                </div>
        );

        const imageBodyTemplate = (product) => {
                return <Image src={product.images[0]} zoomSrc={product.images[0]} alt="image-product" className="w-[4rem] xs:w-[6rem] object-cover" preview/>
        }

        const jumlahBodyTemplate = (product) => {
                return (
                        <>
                                <div className="flex items-center gap-1">
                                        <Button onClick={() => dispatch(incerementCart(product))} size="small" icon="pi pi-plus" className="!p-1 !py-2 !text-[.5rem] !rounded-none"/>
                                        <Button size="small" label={product.count} className="!py-[5px] !rounded-none"/>
                                        <Button onClick={() => dispatch(decrementCart(product))} size="small" icon="pi pi-minus" className="!p-1 !py-2 !text-[.5rem] !rounded-none"/>
                                </div>
                        </>
                )
        }

        const actionBodyTemplate = (product) => {
                return (
                        <Button onClick={() => dispatch(deleteCart(product))} icon="pi pi-trash"className="!bg-red-700 !border-none !outline-none !focus:border-none !rounded-sm !text-white !text-sm"></Button>
                )
        }

        const footerTable = (
                <div className="flex items-center justify-between flex-wrap !text-sm sm:!text-base my-3">
                        <div>Terdapat<span className="text-sky-300"> {products ? products.length : 0} produk</span> berbeda</div>
                        <Button
                                size="small"
                                label="Bayar Sekarang"
                                className="!bg-pink-300  !border-none !py-3 !px-2 !pe-3 !text-sm flex items-center !mt-2 xs:!mt-0"
                                icon={( <img src={ moneyBag } alt="bayar dong!!!" className="w-[23px] h-[23px] mr-1"/> )}/>
                </div>
        );

        return (
                <div className="px-7 my-5">
                        <DataTable value={products} header={headerTable} footer={footerTable} tableStyle={{ minWidth: '12rem' }}>
                                <Column header="Nama" body={(product) => (<span className="!text-[.7rem] xs:!text-[.75rem] line-clamp-3">{product.title}</span>)}></Column>
                                <Column header="Gambar" body={imageBodyTemplate}></Column>
                                <Column header="Jumlah" body={jumlahBodyTemplate}></Column>
                                <Column header="Harga" body={(product) => (<span className="flex items-center gap-1 text-sm">${product.price}</span>)}></Column>
                                <Column header="Total" body={(product) => (<span className="flex items-center gap-1 text-sm">${product.total_price}</span>)}></Column>
                                <Column header="Deskripsi" body={(product) => (<span className="text-[.8rem] line-clamp-3">{product.description}</span>)}></Column>
                                <Column header="Aksi" body={actionBodyTemplate}></Column>
                        </DataTable>
                </div>
        )
}

export default ListCart