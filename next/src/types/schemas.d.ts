export interface NavigationItem extends Object {
  id: string;
  type: string;
  title: string;
  icon: string;
  label: string;
  interface: string;
  url: string;
  open_in_new_tab: boolean;
  has_children: boolean;
  children: NavigationItem[];
  parent: string;
  page: {
    slug: string;
  };
}
