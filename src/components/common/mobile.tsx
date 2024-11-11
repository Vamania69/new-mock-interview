import Link from 'next/link';

const MobileMenu = ({ closeMenu }: any) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
        <ul className="space-y-8 text-center">
            <li onClick={closeMenu}>
                <Link href="/" className="text-white text-2xl hover:text-gray-300">
                    Home
                </Link>
            </li>
            <li onClick={closeMenu}>
                <Link href="/about" className="text-white text-2xl hover:text-gray-300">
                    About
                </Link>
            </li>
            <li onClick={closeMenu}>
                <Link href="/services" className="text-white text-2xl hover:text-gray-300">
                    Services
                </Link>
            </li>
            <li onClick={closeMenu}>
                <Link href="/contact" className="text-white text-2xl hover:text-gray-300">
                    Contact
                </Link>
            </li>
        </ul>
    </div>
);

export default MobileMenu;
