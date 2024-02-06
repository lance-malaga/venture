import Image from 'next/image'
import Logo from '../../public/images/whitelogo.png'
export default function Footer(){
    return (
        <div className="flex flex-col h-96 max-w-full w-full text-sm bg-black m-0"> 
            <div className="flex flex-row text-sm w-full justify-center">
                <div className='flex w-full'>
                    <p className='text-sm'>© 2024 Venture. All  rights reserved.</p>
                </div>
                <div className="flex w-full gap-x-3 items-center">
                    <Image src={Logo} alt="logo png" width={32} height={30}/>
                    <p>VENTURE</p>
                </div>
                <div>
                    venture@mail.com
                </div>
            </div>
        </div>
    )
}