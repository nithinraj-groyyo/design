import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import AddAddress from './AddAddress';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { getProfileAddressResponse, removeAddressResponse, setDefaultAddressResponse } from '../../../api/userApi';
import { IAddressResponse } from '../../../types/users';
import { toast } from 'react-toastify';

const Address = () => {
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [addresses, setAddresses] = useState<IAddressResponse[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<number | null>(null);
  const [addressFormType, setAddressFormType] = useState<"create" | "edit">("create");
  const [selectedAddress, setSelectedAddress] = useState<IAddressResponse | null>(null);

  const userId = JSON.parse(localStorage.getItem("userId") as string);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await getProfileAddressResponse({ userId });
        if (response) {
          setAddresses(response?.address);
          const defaultAddr = response?.address?.find((addr: IAddressResponse) => addr?.flag);
          setDefaultAddress(defaultAddr?.id || null);
        }
      } catch (error: any) {
        toast.error("Unable to Fetch Addresses");
        console.error(error?.message);
      }
    };

    fetchUserAddress();
  }, []);

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      const response = await setDefaultAddressResponse({ addressId });
      if (response) {
        setDefaultAddress(addressId);
        toast.success("Updated Default Address Successfully");
      }
    } catch (error: any) {
      toast.error("Unable to Set Default Address");
      console.error(error?.message);
    }
  };

  const handleRemoveAddress = async (addressId: number) => {
    try {
      const response = await removeAddressResponse({ addressId });
      if (response?.success !== false) {
        setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
        toast.success("Address Removed Successfully");
      } else {
        toast.error("Unable to Remove this Address");
      }
    } catch (error: any) {
      toast.error("Unable to Remove this Address");
      console.error(error?.message);
    }
  };

  const handleEditAddress = (address: IAddressResponse) => {
    setSelectedAddress(address);
    setAddressFormType("edit");
    setAddAddressModal(true);
  };

  const handleCreateAddress = () => {
    setSelectedAddress(null);
    setAddressFormType("create");
    setAddAddressModal(true);
  };

  return (
    <>
      {addAddressModal && (
        <AddAddress
          setAddAddressModal={setAddAddressModal}
          address={selectedAddress}
        />
      )}
      {!addAddressModal && (
        <div className='flex flex-col p-4 bg-white m-4 rounded-lg'>
          <div className='flex justify-between'>
            <div className='font-bold'>All Addresses</div>
            <div className='mb-4 mr-4'>
              <Button
                variant="contained"
                className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
                onClick={handleCreateAddress}
              >
                <p className='text-base font-semibold'>Add New</p>
              </Button>
            </div>
          </div>
          <div className='w-full h-fit flex flex-col gap-4 align-middle'>
            {addresses?.map((address) => (
              <div key={address?.id} className='bg-white p-4 w-full flex flex-col gap-4'>
                <div>{address?.addressType === "Work" ? <WorkIcon /> : <HomeIcon />}</div>
                <div className='flex flex-col gap-1 bg-[#f1f1f1]'>
                  <div className='p-4'>
                    <div className='font-semibold'>{address?.addressName}</div>
                    <div className='flex gap-1'>
                      <span>{address?.streetAddress1},</span>
                      <span>{address?.streetAddress2},</span>
                      <span>{address?.city},</span>
                      <span>{address?.state}-</span>
                      <span>{address?.zip}</span>
                    </div>
                  </div>
                  <div className='p-4'>
                    <div className='flex gap-2'>
                      <Button
                        variant="outlined"
                        className="w-[20%] h-[3rem] !border-black !text-black"
                        onClick={() => handleEditAddress(address)}
                      >
                        <b>Edit</b>
                      </Button>
                      {address?.flag ? (
                        <Button
                          variant="outlined"
                          className="w-[20%] h-[3rem] !border-t-gray-400 !text-lime-700"
                        >
                          <b>Default</b>
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          className="w-[20%] h-[3rem] !border-t-gray-400 !text-black"
                          onClick={() => handleSetDefaultAddress(address?.id)}
                        >
                          <b>Set Default</b>
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        className="w-[20%] h-[3rem] !border-black !text-black"
                        onClick={() => handleRemoveAddress(address?.id)}
                      >
                        <b>Remove</b>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Address;