import { Divider } from "primereact/divider"

const Footer = () => {
        return (
                <>
                        <footer className="px-7 my-3 mt-12 p-3 flex flex-col items-center !text-center">
                                <p className="font-extrabold text-2xl">CartSultra</p>
                                <p className="italic">Tempat untuk menemukan produk termurah dan terbaik dari kami</p>
                                <div className="mt-3 flex flex-nowrap gap-2">
                                        <a href="" className="rounded-[50%] px-2 py-1 bg-sky-400">
                                                <i className="pi pi-instagram"></i>
                                        </a>
                                        <a href="" className="rounded-[50%] px-2 py-1 bg-sky-400">
                                                <i className="pi pi-github"></i>
                                        </a>
                                        <a href="" className="rounded-[50%] px-2 py-1 bg-sky-400">
                                                <i className="pi pi-youtube"></i>
                                        </a>
                                        <a href="" className="rounded-[50%] px-2 py-1 bg-sky-400">
                                                <i className="pi pi-whatsapp"></i>
                                        </a>
                                </div>
                                <Divider />
                                <span>&copy; CartSultra All Rights Reversed. 2025</span>
                                <div className="flex gap-1 items-center my-4">
                                        <a href="">Syarat & Ketentuan</a>
                                        <Divider layout="vertical"/>
                                        <a href="">Kebijakan Privasi</a>
                                </div>
                        </footer>
                </>
        )
}

export default Footer