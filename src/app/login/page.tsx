import Image from 'next/image';
import logo from '@/assets/images/logo.svg'
import FormLogin from '@/components/login/FormLogin';

export default function LoginPage() {

  return (
    <div className='w-screen h-screen bg-ghost flex justify-center items-center'>
      <div className='bg-white p-10'>
        <Image src={logo} alt="Elo Drinks Eventos" />
        <FormLogin />
      </div>
    </div>
  );
}