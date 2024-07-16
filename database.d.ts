interface User {
    uid: string;
    fullName?: string;
    username?: string;
    year?: string;
    program?: string;
    bio?: string;
    interests?: string[];
    friends: User[];
    execOf?: string[];
    image?: string;
    pronouns?: string;
    institution?: string;
    favoritedEvents?: Event[];
    registeredEvents?: Event[]
}
  
interface Organization {
    uid: string;
    name: string;
    description?: string;
    members: User[];
    events: Event[];
    feedback: Feedback[];
    createdAt: Date;
    yearFounded: Date;
    org_type: string;
    logo: string;
    linkedinLink: string?;
    website: string?;
    instagramLink: string?;
    otherLink: string?;
    hiring?: boolean;
    email: string;
    phone: number?
  }
  
  interface Event {
    uid: string;
    name: string;
    description?: string;
    date: Date;
    time: string;
    location: string;
    organization: Organization;
    attendees: User[];
    feedback: Feedback[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Feedback {
    uid: string;
    eventId: string;
    userId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
  }