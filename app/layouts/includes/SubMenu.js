"use client"

const menuItems = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Saved' },
    { id: 3, name: 'Electronics' },
    { id: 4, name: 'Fashion' },
    { id: 5, name: 'Collectables and Art' },
    { id: 6, name: 'Sports' },
    { id: 7, name: 'Health & Beauty' },
    { id: 8, name: 'Sell' },
]

const SubMenu = () => {
  return (
    <nav id="SubMenu" className="border-b w-full">
      <div className="flex items-center justify-between w-full mx-auto px-4"> 
        <ul id="TopMenuLeft"
            className="flex items-center text-[13px] text-[#333333] px-2 h-8"
        >
            {menuItems.map(item=> (
                <li key={item.id} className="px-3 hover:underline cursor-pointer">
                  {item.name}
               </li>
   
            ))}
        </ul>
      </div>
    </nav>
  );
};

export default SubMenu;
