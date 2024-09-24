import { useEffect, useReducer } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import EditForm from './EditForm';
import { aboutUsContent, clientData } from '../../../../utilities/constants';
import { aboutUsInitialState, aboutUsReducer } from '../../../../reducer/adminAboutControlReducer';
import AccountSettingsLayout from '../../../../layouts/AccountSettingsLayout';

const AboutUsInfo = () => {
  const [state, dispatch] = useReducer(aboutUsReducer, aboutUsInitialState);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENTS", payload: clientData?.map((client) => {
        return {
          name: client?.name,
          logo: client?.url,
          file: null,
        }
      })
    })
  }, [])
  const editAboutHandler = () => {
    dispatch({ type: 'SET_ABOUT_CONTENT', payload: aboutUsContent });
    dispatch({
      type: 'SET_CLIENTS',
      payload: clientData.map((client) => ({
        name: client.name,
        logo: client.url,
        file: null,
      })),
    });
    dispatch({ type: 'TOGGLE_EDIT_PAGE' });
  };

  const updateAboutHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('aboutContent', state.aboutContent);

      state.clients.forEach((client, index) => {
        formData.append(`clients[${index}][name]`, client.name);
        if (client.file) {
          formData.append(`clients[${index}][file]`, client.file);
        }
      });

      console.log('payload', formData);
      dispatch({ type: 'TOGGLE_EDIT_PAGE' });
      dispatch({ type: "SET_CLIENTS", payload: state?.clients })
      return
      await axios.post('/api/about-us', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('About Us info updated successfully!');
      dispatch({ type: 'TOGGLE_EDIT_PAGE' });
    } catch (error) {
      toast.error('Failed to update About Us info.');
    }
  };

  const cancelAboutHandler = () => {
    dispatch({ type: 'TOGGLE_EDIT_PAGE' });
  };

  return (
    <AccountSettingsLayout>
      <div className='py-4 px-8 flex items-center justify-between flex-row'>
        <p className='text-xl font-bold'>About Us</p>
        {state.editAboutPage ? (
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
        {state.editAboutPage ? (
          <EditForm
            aboutContent={state.aboutContent}
            dispatch={dispatch}
            clients={state.clients}
          />
        ) : (
          <div className="rounded-lg shadow-lg p-6">
            <div className="w-full text-justify p-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                {state.aboutContent || aboutUsContent}
              </p>
            </div>

            <div className="my-6">
              <h3 className="text-xl font-bold mb-4">Client Names</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {state.clients?.map((logo, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      className="w-32 p-2 h-auto object-contain shadow-md rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                      src={logo.logo ?? ""}
                      alt={logo.name}
                    />
                    <div className="mt-2 text-md font-medium text-gray-600 mb-2 italic">
                      {logo.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountSettingsLayout>
  );
};

export default AboutUsInfo;
