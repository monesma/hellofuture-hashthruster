import partner from './partner';
import admin from './admin';
import project from './project';
import token from './token'
export default {
  ...partner,
  ...admin,
  ...project,
  ...token
};
