import { Status } from '@/generated/graphql';

export const pointsType = {
  ZERO: '0 points',
  ONE: '1 points',
  TWO: '2 points',
  FOUR: '4 points',
  EIGHT: '8 points',
};

export const statusType: Record<Status, string> = {
  BACKLOG: 'Backlog',
  TODO: 'ToDo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  CANCELLED: 'Cancelled',
};

export const tagsType = {
  ANDROID: 'Android',
  IOS: 'IOS APP',
  NODE_JS: 'NodeJs',
  RAILS: 'Rails',
  REACT: 'React',
};

export const tagsColor: Record<keyof typeof tagsType, string> = {
  ANDROID: '#3DDC84', // Example color for Android
  IOS: '#000000', // Example color for iOS (black)
  NODE_JS: '#339933', // Example color for Node.js (green)
  RAILS: '#CC0000', // Example color for Rails (red)
  REACT: '#61DAFB', // Example color for React (blue)
};
