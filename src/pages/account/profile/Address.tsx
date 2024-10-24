import { Button } from '@mui/material';
import { useState } from 'react';
import AddAddress from './AddAddress';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { toast } from 'react-toastify';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { IAddressResponse } from '../../../types/users';
import {
  useGetAddressesQuery,
  useDeleteAddressMutation,
  useUpdateDefaultAddressMutation
} from '../../../rtk-query/addressApiSlice';  
import NoDataAvailable from '../../../components/NoDataAvailable';

const Address = () => {
  const [addAddressModal, setAddAddressModal] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState<number | null>(null);
  const [addressFormType, setAddressFormType] = useState<"create" | "edit">("create");
  const [selectedAddress, setSelectedAddress] = useState<IAddressResponse | undefined>();

  const token = JSON.parse(localStorage.getItem('authToken') as string);

  const { data: addresses, isError, isLoading, refetch } = useGetAddressesQuery({ token });
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateDefaultAddress] = useUpdateDefaultAddressMutation();  

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      const response = await updateDefaultAddress({ addressId, token }).unwrap();  
      if (response) {
        setDefaultAddress(addressId);
        toast.success("Updated Default Address Successfully");
        refetch();  
      }
    } catch (error: any) {
      toast.error("Unable to Set Default Address");
      console.error(error?.message);
    }
  };

  const handleRemoveAddress = async (addressId: number) => {
    try {
      const response = await deleteAddress({ addressId, token }).unwrap();
      if (response?.status) {
        toast.success(response?.message);
        refetch();  
      }
    } catch (error: any) {
      toast.error("Unable to Remove this Address");
      console.error(error?.message);
    }
  };

  const handleEditAddress = (address: IAddressResponse) => {
    console.log(address,"kkkk")
    setSelectedAddress(address);
    setAddressFormType("edit");
    setAddAddressModal(true);
  };

  const handleCreateAddress = () => {
    setSelectedAddress(undefined);
    setAddressFormType("create");
    setAddAddressModal(true);
  };

  if (isLoading) return <p>Loading addresses...</p>;
  if (isError) return <p>Failed to load addresses</p>;

  return (
    <>
      <AccountSettingsLayout>
        <AccountSettingsLayout.Header title="Manage Address">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAddress}
          >
            Add Address
          </Button>
        </AccountSettingsLayout.Header>
        {addAddressModal && (
          <AddAddress
            setAddAddressModal={setAddAddressModal}
            address={selectedAddress!}
          />
        )}
        {!addAddressModal && (
          <div className="p-4 bg-white m-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {
                addresses && addresses?.data?.length > 0 && (
                  addresses?.data?.map((address: any) => (
                    <div
                      key={address?.id}
                      className={` p-4 border rounded-lg shadow-md ${address?.isDefault ? "bg-green-200" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center mb-2">
                        {address?.addressType === "Work" ? (
                          <WorkIcon className="text-gray-500" />
                        ) : (
                          <HomeIcon className="text-gray-500" />
                        )}
                        <div className="ml-2 font-semibold">{address?.street}</div>
                      </div>
                      <div className="text-sm text-gray-700">
                        <p>{address?.street}</p>
                        <p>
                          {address?.city}, {address?.state}, {address?.postalCode}
                        </p>
                        <p>{address?.country}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outlined"
                          className="w-[30%] !border-gray-500 !text-black"
                          onClick={() => handleEditAddress(address)}
                        >
                          Edit
                        </Button>
                        {address?.flag ? (
                          <Button
                            variant="outlined"
                            className="w-[30%] !border-green-500 !text-green-600"
                          >
                            Default
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            className="w-[30%] !border-gray-500 !text-black"
                            onClick={() => handleSetDefaultAddress(address?.id)}
                          >
                            Set Default
                          </Button>
                        )}
                        <Button
                          variant="outlined"
                          className="w-[30%] !border-red-500 !text-red-600"
                          onClick={() => handleRemoveAddress(address?.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
            {addresses && addresses?.data?.length === 0 && <div className='w-full'>
              <NoDataAvailable />
            </div>
            }
          </div>
        )}
      </AccountSettingsLayout>
    </>
  );
};

export default Address;
