import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';

interface Client {
  name: string;
  logo: string | null;
  file: File | null;
}

const AboutUsInfo = () => {
  const [editAboutPage, setEditAboutPage] = useState(false);
  const [aboutContent, setAboutContent] = useState('');
  const [clients, setClients] = useState<Client[]>([
    { name: '', logo: null, file: null },
  ]);


  const editAboutHandler = () => {
    setEditAboutPage(true);
  };


  const updateAboutHandler = async () => {
    try {
      const payload = {
        aboutContent,
        clients: clients.map((client) => ({
          name: client.name,
          logo: client.file,
        })),
      };

      console.log("payload", payload)
      await axios.post('/api/about-us', payload);


      toast.success('About Us info updated successfully!');
      setEditAboutPage(false);
    } catch (error) {
      toast.error('Failed to update About Us info.');
    }
  };

  const cancelAboutHandler = () => {
    setEditAboutPage(false)
  }

  const logos = [
    { src: '/images/ClientsLogos/DeFacto.png', alt: 'DeFacto' },
    { src: '/images/ClientsLogos/Ross.png', alt: 'Ross' },
    { src: '/images/ClientsLogos/Sinsay.png', alt: 'Sinsay' },
    { src: '/images/ClientsLogos/Reserved.png', alt: 'Reserved' },
    { src: '/images/ClientsLogos/Boohoo.png', alt: 'Boohoo' },
    { src: '/images/ClientsLogos/oxxo.svg', alt: 'Oxxo' },
    { src: '/images/ClientsLogos/Mango.png', alt: 'Mango', mixBlendMode: 'color-burn' },
    { src: '/images/ClientsLogos/Myntra.png', alt: 'Myntra' },
    { src: '/images/ClientsLogos/hottopic.png', alt: 'Hot Topic' },
    { src: '/images/ClientsLogos/r&bb.png', alt: 'R&B' }
  ];

  return (
    <div className='w-full p-[1.5rem]'>
      <div className='bg-white w-full  rounded-lg'>
        <div className='py-4 px-8 flex items-center justify-between flex-row'>
          <p className='text-xl font-bold'>About Us</p>
          {editAboutPage ? (
            <div className='flex items-center gap-4'>
              <Button
                variant="contained"
                className="w-[12rem] h-[3rem] !rounded-full !bg-white !text-black"
                onClick={cancelAboutHandler}
              >
                <p className="text-base font-semibold">Cancel</p>
              </Button>
              <Button
                variant="contained"
                className="w-[12rem] h-[3rem] !rounded-full !bg-[#a3865b]"
                onClick={updateAboutHandler}
              >
                <p className="text-base font-semibold">Save</p>
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              className="w-[12rem] h-[3rem] !rounded-full !bg-[#a3865b]"
              onClick={editAboutHandler}
            >
              <p className="text-base font-semibold">Edit</p>
            </Button>
          )}
        </div>
        <div>
          {editAboutPage ? (
            <EditForm
              aboutContent={aboutContent}
              setAboutContent={setAboutContent}
              clients={clients}
              setClients={setClients}
            />
          ) : (
            <div className="rounded-lg shadow-lg p-6">
              <div className="w-full text-justify p-4 text-gray-700 leading-relaxed">
                {/* <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
                    Groyyo Design Studio
                    </h2> */}
                <p className="text-lg">
                  Founded in 2021 and based in Gurgaon, Groyyo Design Studio is a one-stop
                  solution for fashion and lifestyle design needs. Blending creativity with
                  innovation, the studio crafts unique, trend-forward designs that help brands
                  stand out in the fast-paced fashion industry. By merging timeless elegance
                  with modern flair, classic aesthetics are revived with a fresh, contemporary
                  twist. In addition to offering ready-made collections, clients can book
                  appointments for personalized customization services to bring their vision to
                  life. Whether it's original designs or bespoke solutions, Groyyo Design Studio
                  delivers exceptional quality, style, and craftsmanship to elevate any brand.
                </p>
              </div>

              <div className=" my-6">
                <h3 className="text-xl font-bold  mb-4">Client Names</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {logos.map((logo, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-lg font-bold text-gray-700 mb-2">
                        {logo?.alt}
                      </div>
                      <img
                        className="w-32 p-2 h-auto object-contain shadow-md rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                        src={logo.src}
                        alt={logo.alt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfo;

