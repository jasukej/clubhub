// app/welcome/Page2.tsx
import React from 'react';
import WelcomePage from './WelcomePage';

const Page2 = () => {
  return (
    <WelcomePage
      subheading="No more digging for info"
      paragraph="Lorem ipsum whatever idk placeholder text idk idk"
      // illustration={<YourIllustrationComponent />} 
      currentPage={1}
      totalPages={3}
      nextPage="/welcome/Page3"
      isLastPage={false}
    />
  );
};

export default Page2;
