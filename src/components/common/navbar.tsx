'use client'
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import MenuItems from './menu-items';
import MobileMenu from './mobile';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full flex items-center justify-between p-4 bg-gray-800 text-white">
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
                <Link href="/" className="text-2xl font-bold text-white">
                    AI Mock Interviewer
                </Link>

                <div className="lg:hidden" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? (
                        <X className="h-8 w-8 text-white" />
                    ) : (
                        <MenuIcon className="h-8 w-8 text-white" />
                    )}
                </div>

                <div className="hidden lg:flex">
                    <MenuItems />
                </div>
            </div>
            {isMobileMenuOpen && <MobileMenu closeMenu={toggleMobileMenu} />}
        </nav>
    );
};

export default Navbar
