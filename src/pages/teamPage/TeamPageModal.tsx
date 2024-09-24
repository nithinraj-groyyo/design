import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

const TeamPageModal = () => {
  return (
    <div className='flex justify-end h-screen'>
        <div className='w-[50%] bg-red-600 p-12 flex flex-col gap-24'>
            <div className='flex justify-between mt-4'>
                <div className='flex flex-col'>
                    <div className='text-6xl'>Devin Burns</div>
                    <div className='text-3xl'>CEO</div>
                </div>
                <div><CloseIcon fontSize='large'/></div>
            </div>
            <div className='flex flex-col gap-8'>
                <div className='text-2xl font-extralight'>Devin Burns, MBA, CPA, brings a wealth of experience to Inspectorio. His financial leadership and expertise in SaaS optimization, pricing, and M&A transactions are evident in his pivotal role steering corporate financial strategy and fundraising. Devin's transformative impact, demonstrated at Zylo, Mersive Technologies, and Spyder Active Sports, positions him as a key partner in Inspectorio's journey toward financial and operational success.</div>
                <div className='font-semibold'>Linkdin</div>
            </div>
        </div>
      
    </div>
  )
}

export default TeamPageModal
