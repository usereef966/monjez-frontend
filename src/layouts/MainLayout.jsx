import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" dir="rtl">
        {/* شعار الموقع */}
        <div className="text-2xl font-bold text-purple-700 font-tajawal">
          🚀 منجز
        </div>

        {/* روابط التنقل */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">الرئيسية</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">من نحن</Link>
          <Link to="/services" className="text-gray-700 hover:text-purple-600 font-medium">الخدمات</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">تواصل معنا</Link>
        </nav>

        {/* زر دخول */}
        <Link
          to="/login"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-tajawal transition"
        >
          دخول
        </Link>
      </div>
    </header>
  )
}
