export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white h-100px ">

      <div className="w-full  flex  justify-evenly items-center gap-1">

        {/* ABOUT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our College</h2>
          <p className="text-gray-400 leading-relaxed">
            We provide modern education, 
            innovative programs and a strong <br />
            foundation for students to build their future.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Programs</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-400">Email: info@college.com</p>
          <p className="text-gray-400 mt-2">Phone: +374 00 000000</p>
          <p className="text-gray-400 mt-2">Yerevan, Armenia</p>
        </div>

      </div>

      <div className="border-t border-white/10 text-center h-40  flex items-center justify-center text-gray-500 text-sm ">
        © {new Date().getFullYear()} Our College. All rights reserved.
      </div>

    </footer>
  );
}