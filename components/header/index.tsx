import Image from 'next/image'
import Logo from '../../public/images/logo.png'
export default function Header(){
    return (
        <div className="flex flex-col h-96 max-w-full w-full text-2xl"> 
            <div className="flex flex-row text-2xl w-full justify-start">
                <div className="flex w-full justify-start gap-x-3 content-center">
                    <Image src={Logo} alt="logo png" width={32} height={30}/>
                    <p>VENTURE</p>
                </div>
                <p className="flex w-full justify-end text-2xl">
                    Statistics
                </p>
            </div>
        </div>
    )
}