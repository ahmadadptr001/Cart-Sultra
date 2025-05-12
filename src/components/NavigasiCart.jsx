
import { Menubar } from "primereact/menubar"
import { useNavigate } from "react-router-dom"

const NavigasiCart = () => {

        const navigate = useNavigate();
        const items = [
                {
                        label: 'Home',
                        icon: "pi pi-home",
                        command: () => navigate('/')
                },
                {
                        label: (
                                <div>   
                                        Keranjang {" "}
                                </div>        
                        ),
                        icon: 'pi pi-shopping-cart',
                        command: () => navigate('/cart')
                }
        ]


        return (
                <>
                        <div className="px-7">
                                <p className="brand text-[2rem] font-extrabold">
                                        Cart<span className="text-gray-500">Sultra</span>
                                </p>
                                <Menubar model={items} className="mt-1" />
                        </div>
                </>
        )
}

export default NavigasiCart