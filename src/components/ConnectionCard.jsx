import React from 'react'

const ConnectionCard = () => {

  return (
    <div className='flex border border-gray-500 rounded-2xl  max-w-md px-3 py-1 items-start'>

  {/* info */}
  <div className='flex flex-col max-w-60'>
    
  
   <h3 className='font-bold'>Xavi Simons</h3>
   <span>Xavi Simons is a Dutch professional footballer  for Premier League club Tottenham Hotspur and the Netherlands national team</span>


  <div className="flex justify gap-4 text-xs text-gray mt-3 ">
     <span>Male</span>
    <span className=" ">25 Years</span>
    <span className="">Female</span>
  </div>

  </div>

  {/* profile pic */}

     <div className="w-24 h-36 rounded-4xl overflow-hidden border-2 border-gray-500 mb-3">
        <img
          src={"https://assets-fr.imgfoot.com/media/cache/1200x1200/xavi-simons-2122-62c2afb7de1bb.jpg"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  )
}

export default ConnectionCard