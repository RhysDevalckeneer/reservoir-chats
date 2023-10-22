import React from 'react'

const BotMessage = ({msg}: any) => {
  return (
    <div className="w-full text-slate-400 flex flex-row items-center my-4">
      <div className="h-[1px] w-5/12 bg-slate-300"></div>
      <div className="w-2/12 text-center text-sm">
        {msg}
      </div>
      <div className="h-[1px] w-5/12 bg-slate-300"></div>
    </div>
  )
}

export default BotMessage