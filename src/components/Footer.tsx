import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const servicesLinks = [
  'AI & Data Analytics',
  'Custom Software Development',
  'ERP Solutions',
  'Mobile App Development',
  'IT Consulting',
]

const companyLinks = ['About Us', 'Careers', 'Contact Us']

const legalLinks = ['Terms and Condition', 'Privacy Policy']

export function Footer() {
  return (
    <footer className="py-16 pt-8 px-8 bg-bg-card border-t border-white/5" data-scroll-section>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-16">
        <div>
          <a href="#home" className="font-mono text-lg font-semibold text-matrix-green tracking-tight drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] hover:text-accent-green transition-colors inline-block mb-4">
            <span className="text-white/90">[</span>Algentrix<span className="text-white/90">]</span>
          </a>
          <p className="text-[#a0a0b0] text-[0.95rem] leading-relaxed mb-6 max-w-[320px]">
            Algentrix builds intelligent digital systems that help organizations 
            solve complex challenges and unlock new opportunities.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center text-[#a0a0b0] transition-all hover:bg-accent-orange hover:text-bg-dark" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center text-[#a0a0b0] transition-all hover:bg-accent-orange hover:text-bg-dark" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center text-[#a0a0b0] transition-all hover:bg-accent-orange hover:text-bg-dark" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center text-[#a0a0b0] transition-all hover:bg-accent-orange hover:text-bg-dark" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#a0a0b0]">Services</h4>
            <ul className="list-none">
              {servicesLinks.map((link) => (
                <li key={link} className="mb-2">
                  <a href="#" className="text-[#a0a0b0] text-sm transition-colors hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#a0a0b0]">Company</h4>
            <ul className="list-none">
              {companyLinks.map((link) => (
                <li key={link} className="mb-2">
                  <a href="#" className="text-[#a0a0b0] text-sm transition-colors hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-[#a0a0b0]">Legal</h4>
            <ul className="list-none">
              {legalLinks.map((link) => (
                <li key={link} className="mb-2">
                  <a href="#" className="text-[#a0a0b0] text-sm transition-colors hover:text-white">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[#a0a0b0] text-sm">
          © {new Date().getFullYear()} Algentrix. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
