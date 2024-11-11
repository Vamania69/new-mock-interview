import Link from 'next/link';

const MenuItems = () => (
    <ul className="flex space-x-8">
        <li>
            <Link href="/" className="text-white hover:text-gray-300">
                Home
            </Link>
        </li>
        <li>
            <Link href="/about" className="text-white hover:text-gray-300">
                About
            </Link>
        </li>
        <li>
            <Link href="/services" className="text-white hover:text-gray-300">
                Services
            </Link>
        </li>
        <li>
            <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
            </Link>
        </li>
    </ul>
);

export default MenuItems;
