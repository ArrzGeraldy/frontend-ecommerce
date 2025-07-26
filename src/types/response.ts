export interface BaseCategory {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryType extends BaseCategory {
  parent_id: number | null;
  created_at: string;
  parent?: BaseCategory | null;
  children?: BaseCategory | null;
}
export interface CategoryProduct extends BaseCategory {
  parent_id: number | null;
  created_at: string;
  parent?: BaseCategory | null;
}

export interface CategoryTreeType extends BaseCategory {
  parent_id: number | null;
  created_at: string;
  parent?: BaseCategory | null;
  children: BaseCategory[];
}
