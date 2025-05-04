import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
       <Link href={"/"}><h1 className='bold text-xl '>TriplanIQ</h1></Link> 
      <Link href="/triplaniq" className="flex bold border rounded px-2 py-1 items-center hover:bg-gray-300">
      Plan your trip Now
      </Link>
    </nav>
  )
}

export default Navbar
