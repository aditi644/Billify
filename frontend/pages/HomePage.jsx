import React from 'react'
import { useChatStore } from '../src/store/useChatStore'
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Invoices from "../components/invoices.jsx";
import Header from "../components/Header.jsx";

const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
          <div className="flex flex-col h-full rounded-lg overflow-hidden">
            {/* <Sidebar />
            
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
            <Header />
            <Invoices />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
