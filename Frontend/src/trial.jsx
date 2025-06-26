<div className="flex  items-center justify-between p-4">
        {/* Logo */}
        <div className='flex gap-1 items-center'>
          <Menu className="w-8 h-8 ml-2 mr-4"/>
          <img className='w-10 h-10' src="logo.png" alt=""/>
          <h1 className='font-[Karla,sans-serif] font-bold text-2xl'>PUSTAK</h1>
        </div>
        {/* Search */}
        <div className="flex flex-row h-8 w-3xl border  overflow-hidden">
          <input
            className="flex-grow border-none text-6xs font-[Karla,sans-serif]  bg-gray-100 focus:outline-none px-2"
            type="text"
            placeholder="Search"
          />
          <div className="bg-purple-600 px-3 flex items-center justify-center cursor-pointer">
            <Search size={16} color="white" />
          </div>  
        </div>
        {/* Login */}
        <div className="border py-1 px-3 font-semibold">Login</div>
        <div className="rounded-full border p-1 flex items-center justify-center cursor-pointer">
            <Moon size={20}/>
          </div>  
        
      </div>