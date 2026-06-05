export type Identity = {
  name: string;
  pronouns: string;
  headline: string;
  school: string;
  gradYear: string;
  location: string;
};

export type ProfileLink = {
  id: string;
  url: string;
};

export type LookingFor = {
  jobTypes: string[];
  roles: string[];
  industries: string[];
  locations: string[];
};

export type WorkExperience = {
  id: string;
  title: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  field: string;
  startDate: string;
  endDate: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
};

export type Organization = {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};
