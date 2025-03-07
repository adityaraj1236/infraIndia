import { Instagram, Twitter, Youtube } from 'lucide-react';

const data = [
  {
    title: 'Services',
    links: [
      { label: 'Construction Management', link: '#' },
      { label: 'Infrastructure Consulting', link: '#' },
      { label: 'Project Financing', link: '#' },
      { label: 'Green Building Solutions', link: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', link: '#' },
      { label: 'Our Projects', link: '#' },
      { label: 'Careers', link: '#' },
      { label: 'News & Media', link: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', link: '#' },
      { label: 'FAQs', link: '#' },
      { label: 'Investor Relations', link: '#' },
      { label: 'Privacy Policy', link: '#' },
    ],
  },
];

export function FooterLinks() {
  const currentYear = new Date().getFullYear();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <a
        key={index}
        href={link.link}
        onClick={(event) => event.preventDefault()}
        className="text-gray-600 hover:text-gray-900 text-sm block mb-2"
      >
        {link.label}
      </a>
    ));

    return (
      <div key={group.title} className="w-1/3">
        <h3 className="font-semibold text-gray-800 mb-3">{group.title}</h3>
        {links}
      </div>
    );
  });

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start mb-6">
          <div className="w-1/4">
            <div className="font-bold text-lg mb-2">InfraIndia</div>
            <p className="text-sm text-gray-600">
              Building the future with innovative and sustainable infrastructure solutions.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap">{groups}</div>
        </div>

        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© {currentYear} InfraIndia. All rights reserved.</p>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
