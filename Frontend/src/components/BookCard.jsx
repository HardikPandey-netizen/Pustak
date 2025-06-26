import React from 'react'

function BookCard(props) {
  return (
    <div className='border w-56 h-96 flex flex-col items-center'>
      <img className='pt-3 w-40 h-56' src={props.cover_image} alt=""/>
      <div className='flex flex-col items-start mt-4 w-40'>
        <p className='font-normal text-gray-500 gap-1 font-[Nunito Sans] text-[9.5px]'>{props.author}</p>
        <p className='font-bold font-[Lora] text-[15px]'>{props.title}</p>
        <div className='flex flex-row gap-6'>
          <p className='text-[14px] font-medium font-[Quicksand]'>{props.retailPrice} INR</p>
          {props.listPrice && (
            <p className='text-[14px] line-through text-gray-400 font-medium font-[Quicksand]'>
              {props.listPrice} INR
            </p>
          )}
        </div>
        {/* <img src="pdf.png" alt=""/> */}
      </div>
    </div>
  )
}

export default BookCard;
