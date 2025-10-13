import React from 'react'
import {ScrollTrigger, SplitText} from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
      <div>
          <h1 className="text-3xl flex-center font-bold h-[100vh]">
          This is test Text;
          </h1>
      </div>
  )
}

export default App