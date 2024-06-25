// app/welcome/Page3.tsx
import React from 'react';
import WelcomePage from './WelcomePage';

const Page3 = () => {
  return (
    <WelcomePage
      subheading="Turn strangers to connections"
      paragraph="Lorem ipsum whatever idk placeholder text idk idk"
      // illustration={<YourIllustrationComponent />} 
      currentPage={2}
      totalPages={3}
      nextPage="/auth/AuthLanding"
      isLastPage={true}
    />
  );
};

export default Page3;
