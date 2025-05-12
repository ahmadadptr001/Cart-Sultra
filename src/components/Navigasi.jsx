import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { AutoComplete } from "primereact/autocomplete";

import { getAll } from "../utils/getApi";
import { addToCart } from "../utils/userCartSlice";
import { useSelector, useDispatch } from "react-redux";

import badWifiImage from "../assets/bad-wifi.png";
import goodWifiImage from "../assets/good-wifi.png";
import lowWifiImage from "../assets/low-wifi.png";

const Navigasi = () => {

        const toastCart = useRef(null)
        const dispatch = useDispatch();
        const [koneksi, setKoneksi] = useState("");
        const [countCart, setCountCart] = useState([0]);
        const [dataProduct, setDataProduct] = useState([]);
        const [visibleModal, setVisibleModal] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [filteredProduct, setFilteredProduct] = useState(null);

        // untuk beralih halaman / page
        const navigate = useNavigate();

        // cek kualitas jaringan
        useEffect(
                () => {
                        if ('connection' in navigator) {
                                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                                
                                const tipe = connection.effectiveType; 
                                const kecepatan = connection.downlink; 
                                const rtt = connection.rtt; 

                                if ((tipe === '4g' && kecepatan > 5 && rtt < 100)) {
                                        setKoneksi(goodWifiImage)
                                } else if (tipe === '3g' && kecepatan > 1 && rtt < 300) {
                                        setKoneksi(lowWifiImage)
                                } else {
                                        setKoneksi(badWifiImage)
                                }


                        } else {
                                setKoneksi("");
                        }
                }, []
        )

        // item-item navbar
        const items_navbar = [
                {
                        label: "Beranda",
                        icon: "pi pi-home",
                        command: () => navigate("/"),
                },
                {
                        label: (
                                <span className="p-overlay-badge">
                                        Keranjang
                                        {countCart.reduce(
                                                (t, n) => t + n,
                                                0
                                        ) === 0 ? (
                                                <></>
                                        ) : (
                                                <Badge
                                                value={countCart.reduce(
                                                                (
                                                                        total,
                                                                        nilai_tiap_index
                                                                ) =>
                                                                        total +
                                                                        nilai_tiap_index,
                                                                0
                                                        )}
                                                        className="!bg-red-400 !text-[.65rem] !px-0 !py-0"
                                                />
                                        )}
                                </span>
                        ),
                        icon: "pi pi-shopping-cart",
                        command: () => navigate("/cart"),
                },
                {
                        label: "Cari barang",
                        icon: "pi pi-search",
                        command: () => setVisibleModal(!visibleModal),
                },
        ];
        
        // mendapatkan semua data product
        useEffect(()=> {
                (async () => {
                        try {
                                const result = await getAll();
                                setDataProduct(result);

                        } catch (err) {

                        }
                })();
        }, [])

        // mengambil data cart yang telah dipilih user
        const dataCart = useSelector((state) => state.cart.product);

        useEffect(() => {
                const number = [];
                dataCart.map((item_cart, index) => {
                        number.push(item_cart.count);
                        setCountCart(number);
                });
        }, [dataCart]);

        // footer sugesti panel
        const panelFooterTemplateSearch = () => {
                const isProductSelected = (filteredProduct || []).some(
                        (product) =>  product["title"] === selectedProduct
                );
                return (
                        <div className="py-2 px-3 text-[.8rem] text-red-500">
                                {isProductSelected ? (
                                        <span className="text-gray-400">
                                                ingin tambahkan <b><i>{selectedProduct}</i></b> ke dalam keranjang?
                                        </span>
                                ) : (
                                        "No product selected."
                                )}
                        </div>
                );
        };

        // function sugesti panel
        const searchProduct = (event) => {
                setTimeout(() => {
                        let _filteredProduct;

                        if (!event.query.trim().length) {
                                _filteredProduct = [...dataProduct];
                        } else {
                                _filteredProduct = dataProduct.filter(
                                        (product) => {
                                                return product.title
                                                        .toLowerCase()
                                                        .includes(
                                                                event.query.toLowerCase()
                                                        );
                                        }
                                );
                        }

                        setFilteredProduct(_filteredProduct);
                }, 250);
        };

        // body template sugesti panel
        const itemTemplate = (item) => {
                return (
                        <div className="flex flex-nowrap gap-1">
                                <img
                                        alt={item.title}
                                        className={`mr-2`}
                                        src={ item.images[0] }
                                        style={{width: '30px', height: '30px'}}
                                        onError={(e) => e.target.src = "https://placehold.co/600x400?text=Gambar Kosong"}
                                />
                                <div className="flex flex-col gap-1">
                                        <span className="text-[.9rem] line-clamp-2">{item.title}</span>
                                        <span className="text-[.8rem] text-green-500">Harga : ${item.price}</span>
                                </div>
                        </div>
                        );
        };

        // tambahkan pilihan produk search ke dalam keranjang
        const handleCart = () => {
                dispatch(addToCart(selectedProduct))
                toastCart.current.show({ severity: 'success', summary: 'Sukses', detail: 'Berhasil dimasukkan ke keranjang' })
        }

        return (
                <header>
                        {/* khsus modal dialog input */}
                        <Dialog
                                visible={visibleModal}
                                header="Cari Produk"
                                icon="pi pi-search"
                                breakpoints={{ "360px": "98vw" }}
                                icons={() => (
                                        <i className="pi pi-shopping-cart"></i>
                                )}
                                onHide={() => setVisibleModal(!visibleModal)}
                        >
                                <div className="my-3 flex flex-col xs:flex-row items-center gap-2 xs:gap-1 w-full justify-center">
                                        
                                        <AutoComplete
                                                field="title"
                                                value={selectedProduct}
                                                suggestions={filteredProduct} 
                                                itemTemplate={itemTemplate}
                                                completeMethod={searchProduct}
                                                className="!w-full xs:!w-auto !py-2"
                                                onChange={(e) => setSelectedProduct(e.value)}
                                                panelFooterTemplate={panelFooterTemplateSearch} />

                                        <Button
                                                icon="pi pi-shopping-cart"
                                                onClick={() => handleCart()}
                                                className="!w-full xs:!w-inherit !py-2.5 !px-0 xs:!px-6 !rounded-sm"
                                        />

                                        <Toast ref={toastCart} position="top-right"/>
                                </div>

                                

                        </Dialog>

                        <div className="px-7">
                                <div className="flex items-center justify-between">
                                        <p className="brand text-[2rem] font-extrabold">
                                                Cart
                                                <span className="text-gray-500">
                                                        Sultra
                                                </span>
                                        </p>
                                        { 
                                                koneksi ? (<img src={koneksi} alt="koneksi image" className="w-[30px] h-[30px]"/>) : (
                                                        <p className="text-[.7rem]">Browser tidak mendukung fitur wifi</p>
                                                )
                                        }
                                        

                                </div>
                                <Menubar
                                        model={items_navbar}
                                        className="mt-1"
                                />
                        </div>
                </header>
        );
};

export default Navigasi;
