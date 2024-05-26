export interface ResumeData {
  header: Header;
  summary: Summary;
  technicalSkills: TechnicalSkills;
  workExperience: WorkExperience;
  openSourceProjects: OpenSourceProjects;
  education: Education;
  aboutMe: AboutMe;
  playGame: PlayGame;
}

export interface Header {
  firstName: string;
  lastName: string;
  preferredName: string;
  title: string;
  phoneNumber: string;
  location: string;
  email: string;
  portfolio: string;
  portfolioRepo: string;
  linkedIn: string;
  github: string;
  itchio: string;
}

export interface Summary {
  description: string;
  roles: string[];
}

export interface Named {
  name: string;
}

export interface TechnicalSkills {
  sectionHeader: string;
  items: TechnicalSkillsItem[];
}

export interface TechnicalSkillsItem extends Excludable {
  title: string;
  tools: Tool[];
}

export interface Excludable {
  shouldExclude?: boolean;
}

export interface Tool extends Named, Excludable {}

export interface WorkExperience {
  sectionHeader: string;
  jobs: Job[];
}

export interface Job {
  title: string;
  timeDedicated: string;
  teamSize?: string;
  workLocation: string;
  workDateRanges: WorkDateRange[];
  company: string;
  sector: string;
  sectorSpacing: string;
  location: string;
  points: Point[];
  icon?: Icon;
  shouldExclude?: boolean;
}

export interface Icon {
  simple: string;
  staticsize: string;
}

export interface WorkDateRange {
  beginDate: string;
  endDate: string;
}

export interface Point extends Excludable {
  text: string;
}

export interface OpenSourceProjects {
  sectionHeader: string;
  items: OpenSourceProjectsItem[];
}

export interface OpenSourceProjectsItem extends Excludable {
  description: string;
  languages: string[];
  links?: Links;
  tooling: Tooling[];
  roles: Role[];
  availableOn?: string;
  title?: string;
  contributions?: string[];
}

export interface Links {
  main: Link;
  supporting?: Link[];
}

export interface Link {
  href: string;
  label?: string;
}

export interface Tooling extends Named {}

export interface Role extends Named {}

export interface Education {
  sectionHeader: string;
  degrees: Degree[];
}

export interface Degree {
  level: string;
  concentration: string;
  university: string;
  beginDate: string;
  endDate: string;
}

export interface AboutMe {
  hobbies: Hobbies;
}

export interface Hobbies {
  sectionHeader: string;
  items: HobbiesItem[];
}

export interface PlayGame {
  embedded: PlayGameEntry;
  widget: PlayGameEntry;
  link: PlayGameEntry;
}

export interface PlayGameEntry {
  label: string;
  href: string;
  src: string;
}

export interface HobbiesItem {
  title: string;
  description: string;
  links?: Links;
}

export interface ResumeDataWrapper {
  resumeData: Promise<ResumeData>;
}

export type useState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type GenericItem = Partial<HobbiesItem> & Partial<OpenSourceProjectsItem> & Partial<TechnicalSkillsItem>;

export interface OurCardProps {
  item: GenericItem;
  cardContentBodies: (string | ((i: number) => JSX.Element))[];
  getImage: (item: GenericItem) => CardImage;
  getTitle: (item: GenericItem) => string;
  mainLinkButtonText?: string;
  supportingLinkButtonText?: string;
}

export interface MoreMenuProps {
  links: Link[];
  supportingLinkButtonText: string;
}

export type CardImage = string | ((props: any) => React.JSXElementConstructor<any>);

export interface WorkExpEntryProps {
  job: Job;
}

export interface MenuItem {
  listIcon: JSX.Element;
  listText: string;
  listPath: string;
}

export interface OurSelectProps {
  name: string;
  choices: string[];
  selected: string[];
  selectSetter: (selected: string[]) => void;
}

export interface OurCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled: boolean;
}

export interface OurTextFieldProps {
  name: string;
  value: string;
  selectSetter: (value: string) => void;
}

export interface FiltersProps {
  filters: JSX.Element[];
  matchCount: number | null;
  handleClearFilters: () => void;
  clearFiltersDisabled: boolean;
  show?: {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
