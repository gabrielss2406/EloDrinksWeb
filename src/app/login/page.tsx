import Image from 'next/image';
import logo from '@/assets/images/logo-colors.svg'
import FormLogin from '@/components/login/FormLogin';

export default function LoginPage() {

  return (
    <div className='w-screen h-screen bg-[#101820] flex justify-center items-center'>
      <div className='bg-white p-10 space-y-8 rounded-lg sm:w-1/3 w-4/5 flex flex-col items-center'>
        <Image src={logo} alt="Elo Drinks Eventos" />
        <FormLogin />
      </div>
    </div>
  );
}