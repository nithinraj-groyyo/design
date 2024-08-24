import React from 'react';
import { Typography, Link } from '@mui/material';

interface IProductDescriptionProps{
    expanded: any;
    onToggle: any
}

const ProductDescription = ({ expanded, onToggle }: IProductDescriptionProps) => {
    return (
        <>
            <Typography className='text-[#8E8E8E] text-xs whitespace-nowrap !tracking-[0.3rem] font-semibold text-left'>
                COMPOSITION, CARE AND ORIGIN
            </Typography>

            <div className='flex flex-col gap-2'>
                <Typography className='text-[#8E8E8E] text-xs !tracking-[0.3rem] font-semibold text-left'>
                    COMPOSITION
                </Typography>
                <Typography className='text-xs text-[#8E8E8E]'>
                    We work with monitoring programmes to ensure compliance with our social, environmental and health and safety standards for our products. To assess compliance, we have developed a programme of audits and continuous improvement plans.
                </Typography>
                <Typography className='text-xs text-[#8E8E8E]'>100% COTTON</Typography>
            </div>

            {expanded && (
                <>
                    <div className='flex flex-col gap-2'>
                        <Typography className='text-[#8E8E8E] text-xs !tracking-[0.3rem] font-semibold text-left'>
                            CARE
                        </Typography>
                        <Typography className='text-xs text-[#8E8E8E]'>
                            Caring for your clothes is caring for the environment. Lower temperature washes and delicate spin cycles are gentler on garments and help to protect the colour, shape and structure of the fabric. Furthermore, they reduce the amount of energy used in care processes.
                        </Typography>
                        <div className='text-xs text-[#8E8E8E]'>
                            <ul className="list-disc pl-5 space-y-0">
                                <li>Machine wash at max. 30ºC/86ºF with short spin cycle</li>
                                <li>Do not use bleach</li>
                                <li>Iron at a maximum of 110ºC/230ºF</li>
                                <li>Dry clean with tetrachloroethylene</li>
                                <li>Do not tumble dry</li>
                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Typography className='text-[#8E8E8E] text-xs !tracking-[0.3rem] font-semibold text-left'>
                            ORIGIN
                        </Typography>
                        <Typography className='text-xs text-[#8E8E8E]'>
                            We work with our suppliers, workers, unions and international organisations to develop a supply chain in which human rights are respected and promoted, contributing to the United Nations Sustainable Development Goals.
                        </Typography>
                        <Typography className='text-xs text-[#8E8E8E]'>
                            Thanks to the collaboration with our suppliers, we work to know the facilities and processes used to manufacture our products in order to understand their traceability.
                        </Typography>
                        <Typography className='text-xs text-[#8E8E8E]'>MADE IN INDIA</Typography>
                    </div>
                </>
            )}

            <Link onClick={onToggle} className='cursor-pointer !text-[#8E8E8E] whitespace-nowrap'>
                {expanded ? 'View Less' : 'View More'}
            </Link>
        </>
    );
};

export default ProductDescription;