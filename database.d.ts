import firebase from 'firebase/app';
import 'firebase/firestore';

type DocRef<T> = firebase.firestore.DocumentReference<T>;

declare global {
  interface User {
    uid?: string;
    fullName?: string;
    username?: string;
    year?: string;
    program?: string;
    bio?: string;
    interests?: string[];
    friends?: DocRef<User>[];
    execOf?: DocRef<Organization>[];
    image?: string;
    pronouns?: string;
    institution?: string;
    favoritedEvents?: DocRef<Event>[];
    registeredEvents?: DocRef<Event>[];
  }

interface Organization {
  name: string;
  description?: string;
  members: DocRef<User>[];
  events: DocRef<Event>[];
  feedback: DocRef<Feedback>[];
  createdAt: Date;
  yearFounded: Date;
  org_type: string;
  logo: string;
  linkedinLink?: string;
  website?: string;
  instagramLink?: string;
  otherLink?: string;
  hiring?: boolean;
  email: string;
  phone?: number;
}

interface Event {
  uid: string;
  name: string;
  description?: string;
  date: Date;
  time: string;
  location: string;
  organization: DocRef<Organization>;
  attendees: DocRef<User>[];
  feedback: DocRef<Feedback>[];
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
}
