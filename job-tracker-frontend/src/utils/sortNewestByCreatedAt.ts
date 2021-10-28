type HasCreatedAt = {
  createdAt: string;
};

export const sortNewestByCreatedAt = (data1: HasCreatedAt, data2: HasCreatedAt): number => {
  const date1 = new Date(data1.createdAt);
  const date2 = new Date(data2.createdAt);
  if (date1 > date2) {
    return -1;
  }
  return 1;
}