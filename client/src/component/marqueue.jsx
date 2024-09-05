import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-yellow-300 py-2">
      <div className="overflow-hidden whitespace-nowrap">
        <p className="inline-block animate-scroll text-black font-semibold text-lg">
          Important Announcement: Event on 25th September | New Updates Released | Welcome New Members to AARCO
        </p>
      </div>
    </div>
  );
};

export default Marquee;